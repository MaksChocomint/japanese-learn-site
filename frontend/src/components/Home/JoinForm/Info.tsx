import Image from "next/image";
import React from "react";

const Info = () => {
  return (
    <div className="flex flex-col gap-8 text-center justify-center items-center mt-6">
      <Image src="/flags.png" alt="Japan flags" width={60} height={60} />
      <div className="text-white font-bold w-96 text-[18px]">
        Любишь аниме, но хочешь понимать речь любимых героев без субтитров?
        Тогда наш курс создан специально для тебя!
      </div>
      <div className="text-gray-400 text-[14px]">
        Отправь нам свои контактные данные (Email) и получай новые уроки,
        ориентированные на твои личные успехи в освоении языка, и новости о
        нашем проекте! Мы заботимся о каждом участнике нашей программы :3
      </div>
    </div>
  );
};

export default Info;
