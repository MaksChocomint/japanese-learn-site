"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Upload: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);

    // Separate image and video files
    const imageFiles = files.filter((file) => file.type.startsWith("image"));
    const videoFiles = files.filter((file) => file.type.startsWith("video"));

    // Append image files with fieldname 'image'
    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    // Append video files with fieldname 'video'
    videoFiles.forEach((file) => {
      formData.append("video", file);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Урок создан:", response.data);
      setTitle("");
      setText("");
      setFiles([]);
    } catch (error) {
      console.error("Ошибка при создания урока:", error);
    }
  };

  return (
    <div className="mx-auto flex justify-center items-center bg-dark-red-gradient-2 bg-top bg-cover bg-no-repeat w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="text-white w-1/2 bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            className="shadow border-gray-400 appearance-none bg-zinc-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none"
            placeholder="Название урока"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            className="mt-4 shadow border-gray-400 appearance-none resize-none h-72 bg-zinc-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            placeholder="Текст урока..."
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="mb-4 cursor-pointer">
          <div
            {...getRootProps()}
            className={`border-dashed border-2 rounded" ${
              isDragActive ? "border-red-600" : "border-gray-400"
            } p-8 text-center`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-red-600">Отпустите файлы для загрузки</p>
            ) : (
              <p>Перетащите сюда файлы или кликните для выбора</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Загрузить урок
          </button>
        </div>
      </form>
      <div className="absolute top-0 right-0 bg-flowers bg-contain bg-right bg-no-repeat w-96 h-96"></div>
      <div className="absolute bottom-0 left-0 bg-flowers bg-contain rotate-180 bg-left bg-no-repeat w-96 h-96"></div>
    </div>
  );
};

export default Upload;
