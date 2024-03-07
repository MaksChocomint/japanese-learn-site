import React from "react";
import Container from "../Container";
import Profile from "./Profile/Profile";
import Info from "./Info/Info";

const BusinessCard = () => {
  return (
    <div className="mt-10">
      <Container styles={"flex flex-col justify-center items-center relative"}>
        <Profile />
        <Info />
      </Container>
    </div>
  );
};

export default BusinessCard;
