import React from "react";
import styles from "./Info.module.css";
import { FaTelegram } from "react-icons/fa6";

const Info = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute bottom-8">
      <div className={styles.gradient_dark_red}>BLACKHOLCHIK</div>
      <div className="text-gray-200 font-bold text-[22px] absolute top-5">
        МАКСИМ ИВАНОВ
      </div>
      <div className="text-red-900 text-[17px] mt-2">
        Основатель <span className="text-red-700 font-medium">Japones</span>
        <span className="text-gray-200">Online</span>
      </div>
      <div className="flex gap-1 items-center mt-2">
        <div className="text-[13px] text-red-900">Пиши мне сюда -</div>
        <a
          href="https://t.me/maksim_blackholchik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram
            size={22}
            className="text-gray-200 bg-black rounded-full cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default Info;
