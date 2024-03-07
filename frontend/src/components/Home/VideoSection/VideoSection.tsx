import React from "react";
import Intro from "./Intro";
import VideoGrid from "./VideoGrid";
import Container from "../Container";

const VideoSection = () => {
  return (
    <div className="mt-12">
      <Container styles={"flex flex-col justify-center items-center gap-8 "}>
        <Intro />
        <VideoGrid />
      </Container>
    </div>
  );
};

export default VideoSection;
