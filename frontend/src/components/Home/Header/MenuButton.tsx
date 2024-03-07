"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import { IoMenu } from "react-icons/io5";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsOpen(false);
  };

  const handleRegistrationClick = () => {
    setShowRegistration(true);
    setIsOpen(false);
  };

  const closeRegistration = () => {
    setShowRegistration(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
    config: { duration: 100 },
  });

  return (
    <div className="relative" ref={menuRef}>
      <div className="cursor-pointer" onClick={handleClick}>
        <IoMenu size={32} className="text-white" />
      </div>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="absolute top-10 right-0 bg-white rounded-md px-2 py-1 shadow"
            >
              <ul className="divide-y divide-red-900 text-center">
                <li className="cursor-pointer" onClick={handleLoginClick}>
                  Вход
                </li>
                <li
                  className="cursor-pointer"
                  onClick={handleRegistrationClick}
                >
                  Регистрация
                </li>
              </ul>
            </animated.div>
          )
      )}
      {showRegistration && <Registration onClose={closeRegistration} />}
      {showLogin && <Login onClose={closeLogin} />}
    </div>
  );
};

export default MenuButton;
