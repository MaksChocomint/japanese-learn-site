import React from "react";
import Container from "../Container";

const Footer = () => {
  return (
    <div className="mt-16">
      <Container styles={"flex flex-col justify-center items-center text-left"}>
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="text-[14px] text-gray-500 font-medium mt-8">
          © Blackholchik JaponesOnline - обучение японскому языку
        </div>
      </Container>
    </div>
  );
};

export default Footer;
