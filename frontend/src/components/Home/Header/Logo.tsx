import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image src="/logo.png" alt="Header background" width={200} height={40} />
    </div>
  );
};

export default Logo;
