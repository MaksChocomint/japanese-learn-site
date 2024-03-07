"use client";
import CustomInput from "@/components/UI/CustomInput";
import React, { useRef, useState } from "react";
import Modal from "@/components/UI/Modal";
import { MdPerson } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { addContact } from "@/api/contacts";

const Form = () => {
  const [modalContent, setModalContent] = useState("");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const isCheckedRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameRef.current && emailRef.current && isCheckedRef.current) {
      const name = nameRef.current.value.trim();
      const email = emailRef.current.value.trim();
      const isChecked = isCheckedRef.current.checked;

      if (!email) {
        setModalContent("Ты не заполнил поле с Email!");
        router.push("?showModal=y", { scroll: false });
        return;
      }

      if (!name) {
        setModalContent("Ты не заполнил поле с именем!");
        router.push("?showModal=y", { scroll: false });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setModalContent(
          "Твой Email некорректен, введи, пожалуйста существующий почтовый ящик!"
        );
        router.push("?showModal=y", { scroll: false });
        return;
      }

      try {
        // Add the contact
        await addContact(name, email, isChecked);

        // Clear form fields
        nameRef.current.value = "";
        emailRef.current.value = "";
        isCheckedRef.current.checked = false;

        // Set success message
        setModalContent("Контакт успешно добавлен на курс!");
      } catch (error) {
        setModalContent(
          "Произошла ошибка при добавлении контакта! Скорее всего введенный вами Email уже зарегистрирован в нашей системе."
        );
      } finally {
        router.push("?showModal=y", { scroll: false });
      }
    }
  };

  return (
    <form className="flex flex-col w-10/12 mt-6 gap-2" onSubmit={handleSubmit}>
      <CustomInput placeholder="Твоё имя" inputRef={nameRef} Icon={MdPerson} />
      <CustomInput placeholder="Email" inputRef={emailRef} Icon={MdEmail} />
      <div className="flex gap-2 justify-left items-center mt-2">
        <input
          type="checkbox"
          ref={isCheckedRef}
          className="h-4 w-4 border rounded accent-red-600"
        />
        <div className="text-gray-400 text-[13px]">
          Подписаться на рассылку новостей о нашем проекте
        </div>
      </div>
      <button className="w-full bg-red-600 rounded-lg text-white py-3 mt-4">
        Отправить
      </button>

      <Modal
        onClose={() => {
          router.push("/", { scroll: false });
        }}
      >
        <p>{modalContent}</p>
      </Modal>
    </form>
  );
};

export default Form;
