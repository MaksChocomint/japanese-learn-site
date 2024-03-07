"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Upload: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
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
      setText("");
      setFiles([]);
    } catch (error) {
      console.error("Ошибка при создания урока:", error);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            Текст:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            type="text"
            placeholder="Введите текст"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="mb-4">
          <div
            {...getRootProps()}
            className={`border-dashed border-2 rounded ${
              isDragActive ? "border-blue-500" : "border-gray-400"
            } p-4 text-center`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Отпустите файлы для загрузки</p>
            ) : (
              <p>Перетащите сюда файлы или кликните для выбора</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          {files.map((file, index) => (
            <div key={index} className="text-gray-700">
              {file.name}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
