"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface FromBottomRevealProps {
  children: React.ReactNode;
  threshold: number;
  additionalStyles?: React.CSSProperties;
}

const FromBottomReveal: React.FC<FromBottomRevealProps> = ({
  children,
  threshold,
  additionalStyles,
}) => {
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const controls = useAnimation();

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > threshold && !hasPlayed) {
      controls.start({ opacity: 1, y: 0 });
      setHasPlayed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      style={{
        opacity: 0,
        y: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        ...additionalStyles,
      }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FromBottomReveal;
