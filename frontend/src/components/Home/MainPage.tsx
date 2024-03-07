import React from "react";
import Header from "./Header/Header";
import JoinForm from "./JoinForm/JoinForm";
import VideoSection from "./VideoSection/VideoSection";
import BusinessCard from "./BusinessCard/BusinessCard";
import Footer from "./Footer/Footer";
import ChatBot from "../ChatBot/ChatBot";

const MainPage = () => {
  return (
    <div className="bg-dark-gradient bg-top bg-cover bg-no-repeat w-full h-[3300px] ">
      <Header />
      <JoinForm />
      <VideoSection />
      <BusinessCard />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MainPage;
