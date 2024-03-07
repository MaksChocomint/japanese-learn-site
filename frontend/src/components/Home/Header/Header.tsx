"use client";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Logo from "./Logo";
import Container from "../Container";
import MenuButton from "./MenuButton";
import PlayButton from "./PlayButton";
import BottomSection from "./BottomSection";
import FromBottomReveal from "@/utils/FromBottomReveal";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Define the spring animation for fading in
  const fadeAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <animated.div
      style={fadeAnimation}
      className="bg-header bg-top bg-cover bg-no-repeat h-[1000px] relative"
    >
      <Container styles={"flex justify-between items-center"}>
        <Logo />
        <MenuButton />
      </Container>
      <PlayButton />
      <FromBottomReveal
        threshold={100}
        additionalStyles={{ marginTop: "380px" }}
      >
        <BottomSection />
      </FromBottomReveal>
    </animated.div>
  );
};

export default Header;
