"use client";
import React, { useEffect } from "react";
import Greetings from "./Greetings";
import Info from "./Info";
import Form from "./Form";
import Container from "../Container";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";

const JoinForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust the threshold value
  });

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: config.slow,
  });

  return (
    <div ref={ref} className="mt-6 flex items-center justify-center w-full">
      <animated.div style={fadeIn}>
        <Container
          styles={
            "flex flex-col justify-center items-center gap-4 max-w-[1100px]"
          }
        >
          <Greetings />
          <Info />
          <Form />
        </Container>
      </animated.div>
    </div>
  );
};

export default JoinForm;
