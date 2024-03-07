"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { askBot } from "@/api/ai";
import Image from "next/image";
import { BsFillSendFill } from "react-icons/bs";
import { FaArrowDown, FaArrowUp, FaCircleUser } from "react-icons/fa6";
import Modal from "../UI/Modal";
import { useRouter } from "next/navigation";

const ChatBot: React.FC = () => {
  interface Message {
    text: string;
    isUser: boolean;
  }

  const router = useRouter();

  const [userPrompt, setUserPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [modalContent, setModalContent] = useState("");

  const userMessages: Array<string> = [];
  const botMessages: Array<string> = [];
  const [messages, setMessages] = useState<Array<Message>>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [{ y }, api] = useSpring(() => ({
    y: 380,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  useEffect(() => {
    scrollChatDown();
  }, [messages]);

  const bind = useDrag(
    ({ last, movement: [, my] }) => {
      if (my < -100) {
        setIsChatVisible(false);
      } else {
        api.start({ y: my });
      }
    },
    {
      from: () => [0, y.get()],
      bounds: { top: 0 },
      rubberband: true,
    }
  );
  const scrollChatDown = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      userMessages.push(userPrompt);
      if (isLoading) {
        setModalContent("Дождись ответа Мамору-бота!");
        router.push("?showModal=y", { scroll: false });
        return;
      }
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userPrompt, isUser: true },
      ]);

      const localUserPrompt = userPrompt;

      setUserPrompt("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", isUser: false },
      ]);
      const response = await askBot(localUserPrompt);
      setAiResponse(response);
      botMessages.push(response);
      setMessages((prevMessages) =>
        prevMessages.map((msg, id) => {
          if (id === prevMessages.length - 1 && msg.text === "") {
            return { text: response, isUser: false };
          } else {
            return msg;
          }
        })
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, id) => {
          if (id === prevMessages.length - 1 && msg.text === "") {
            return { text: "Извини, но мой сервер лёг :(", isUser: false };
          } else {
            return msg;
          }
        })
      );

      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isChatVisible && !e.shiftKey) {
      e.preventDefault();
      const formEvent = {
        preventDefault: e.preventDefault,
        stopPropagation: e.stopPropagation,
      } as React.FormEvent;
      handleSubmit(formEvent);
    }
  };
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    api.start({ y: isChatVisible ? 380 : 0 });
  };

  return (
    <animated.div
      {...bind()}
      ref={chatRef}
      style={{ transform: y.to((v) => `translateY(${v}px)`) }}
      className="fixed bottom-0 right-2 w-96 max-h-[500px] p-1 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Image src="/bot.png" alt="Аватарка бота" width={50} height={50} />
          <h2 className="text-red-600 text-md font-semibold">Мамору-бот</h2>
        </div>
        <button
          onClick={toggleChatVisibility}
          className="text-white bg-red-600 hover:bg-red-700 transition ease-in duration-200 text-center text-base font-semibold rounded-lg p-2"
        >
          {isChatVisible ? <FaArrowDown /> : <FaArrowUp />}
        </button>
      </div>
      <div
        className="bg-gray-700 overflow-y-auto h-[308px] w-full p-1"
        ref={chatContainerRef}
      >
        <div className="grid grid-cols-6 gap-2">
          {messages.map((msg, id) => {
            return (
              <div
                key={id}
                className={
                  msg.isUser ? "col-start-1 col-end-6" : "col-start-2 col-end-7"
                }
              >
                {msg.isUser ? (
                  <div className="p-2 border rounded bg-gray-800 text-gray-200 flex gap-1 items-start">
                    <div className="flex items-center">
                      <FaCircleUser size={36} />
                    </div>
                    <div className="w-5/6 break-words whitespace-normal">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-2 border rounded transition-colors ${
                      isLoading && msg.text === ""
                        ? "bg-slate-700 text-gray-300"
                        : "bg-gray-800 text-gray-200"
                    } flex gap-1 items-start`}
                  >
                    <div className="w-5/6 whitespace-normal break-words">
                      {isLoading && msg.text === ""
                        ? "Мамору-бот печатает..."
                        : msg.text}
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/bot.png"
                        alt="Аватарка бота"
                        width={50}
                        height={50}
                        objectFit="contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-1 relative w-full border rounded pr-12"
      >
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Напиши боту..."
          onKeyDown={handleKeyDown}
          className="flex-grow p-1 text-gray-200 rounded bg-gray-800 focus:outline-none resize-none "
        />
        <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 absolute right-1 top-1/2 -translate-y-1/2">
          <BsFillSendFill size={20} />
        </button>
      </form>
      <Modal
        onClose={() => {
          router.push("/", { scroll: false });
        }}
      >
        <p>{modalContent}</p>
      </Modal>
    </animated.div>
  );
};

export default ChatBot;
