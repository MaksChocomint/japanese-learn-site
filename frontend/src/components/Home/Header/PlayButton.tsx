import React from "react";
import { HiMiniPlay } from "react-icons/hi2";

const PlayButton = () => {
  return (
    <div className="relative top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all hover:animate-pulse active:scale-105 active:animate-none">
      <HiMiniPlay
        size={32}
        color="white"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4]"
      />
      <div className="w-[52px] h-[52px] rounded-full bg-[#EC1334] opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]"></div>
      <div className="w-[66px] h-[66px] rounded-full bg-[#EC1334] opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"></div>
      <div className="w-[80px] h-[80px] rounded-full bg-[#EC1334] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"></div>
    </div>
  );
};

export default PlayButton;
