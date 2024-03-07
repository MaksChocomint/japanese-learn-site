import React from "react";

const Avatar = () => {
  return (
    <div className="relative top-[300px]">
      <div className="absolute z-1 bg-dark-red-gradient rounded-full w-44 h-44 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute z-2 bg-avatar bg-contain rounded-full w-[170px] h-[170px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default Avatar;
