"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Video from "next-video";
import Container from "@/components/Home/Container";
import { Lesson } from "@/components/Home/VideoSection/VideoGrid";
import { GoArrowLeft } from "react-icons/go";

const LessonPage = () => {
  const pathname = usePathname();
  const id = Number(pathname.split("/").slice(-1)[0]);
  const router = useRouter();

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
        <Container styles={"flex flex-col gap-10 justify-center items-center"}>
          <div className="flex items-center w-full">
            <GoArrowLeft
              size={36}
              onClick={() => {
                router.push("/");
              }}
              className="text-red-600 cursor-pointer hover:text-red-700 transition-colors"
            />
            <div className="w-full flex justify-center">
              <h1 className="text-center text-3xl font-bold mt-5 mr-[34px]">
                {lesson.title}
              </h1>
            </div>
          </div>

          <div
            className="fixed -translate-y-1/2 top-1/2 right-0 bg-flowers bg-contain bg-right bg-no-repeat md:w-96 md:h-96 md:bg-opacity-100 sm:bg-opacity-0"
            style={{ right: 0 }}
          ></div>
          <div
            className="fixed -translate-y-1/2 top-1/2 left-0 bg-flowers rotate-180 bg-contain bg-right bg-no-repeat md:w-96 md:h-96"
            style={{ left: 0 }}
          ></div>

          <div className="w-2/3">
            <Video src={lesson.videoUrl} accentColor="red" />
          </div>

          <div className="text-lg relative z-[100]">{lesson.text}</div>
        </Container>
      </div>
    </div>
  );
};

export default LessonPage;
