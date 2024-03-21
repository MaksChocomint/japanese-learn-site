"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Video from "next-video";
import Container from "@/components/Home/Container";
import { Lesson } from "@/components/Home/VideoSection/VideoGrid";

const Lesson = () => {
  const pathname = usePathname();
  const id = Number(pathname.split("/").slice(-1)[0]);

  const [lesson, setLesson] = useState<Lesson>({
    id: id,
    title: "",
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lessons/${id}`
      );
      const lesson: Lesson = response.data;
      setLesson(lesson);
    } catch (error) {
      console.error("Ошибка при получении урока:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-dark-red-gradient-2 bg-top bg-cover bg-no-repeat w-full min-h-screen">
      <div className="w-full text-white relative">
        <Container styles={"flex flex-col gap-10"}>
          <h1 className="text-center text-3xl font-bold  mt-10">
            {lesson.title}
          </h1>
          <div className="absolute top-0 right-0 bg-flowers bg-contain bg-right bg-no-repeat w-96 h-96"></div>
          <Video src={lesson.videoUrl} />
          <div className="text-lg">{lesson.text}</div>
        </Container>
      </div>
    </div>
  );
};

export default Lesson;
