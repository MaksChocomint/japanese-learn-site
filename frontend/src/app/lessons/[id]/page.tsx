"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const Lesson = () => {
  interface Lesson {
    id: number;
    text: string;
    imageUrl: string;
    videoUrl: string;
  }

  const pathname = usePathname();
  const id = Number(pathname.split("/").slice(-1)[0]);

  const [lesson, setLesson] = useState<Lesson>({
    id: id,
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
  }, [lesson]);
  return (
    <div className="bg-dark-gradient bg-top bg-cover bg-no-repeat w-full min-h-screen]">
      <div className="w-full bg-header bg-right bg-contain bg-no-repeat text-white">
        <Image
          src={lesson.imageUrl}
          alt="background image"
          width={400}
          height={200}
        />
        <div>{lesson.videoUrl}</div>
        <div>{lesson.text}</div>
      </div>
    </div>
  );
};

export default Lesson;
