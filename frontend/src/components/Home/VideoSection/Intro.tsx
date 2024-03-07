import React from "react";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image src="/dragon.png" alt="dragon" width={60} height={60} />
      <div className="font-bold text-white text-[18px]">
        Изучи наши последние уроки уже сейчас{" "}
        <span className="text-red-600">абсолютно бесплатно!</span>
      </div>
    </div>
  );
};

export default Intro;
