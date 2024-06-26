"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface Lesson {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
}

const VideoGrid = () => {
  const [lessons, setLessons] = useState<Array<Lesson>>([]);
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`lessons/${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`
      );
      const lessons: Array<Lesson> = response.data;
      setLessons(lessons);
    } catch (error) {
      console.error("Ошибка при получении уроков:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center w-full">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => handleCardClick(lesson.id)}
          className="p-2 cursor-pointer bg-red-950 border-2 flex flex-col gap-1 border-red-600 rounded-t-lg"
        >
          <div className="text-white">
            {"Урок " + lesson.id + " : " + lesson.title}
          </div>
          <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
            <Image
              key={lesson.id}
              alt="lesson-preview"
              src={lesson.imageUrl}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
