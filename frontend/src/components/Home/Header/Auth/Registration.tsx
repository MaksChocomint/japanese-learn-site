import React from "react";
import { MdClose } from "react-icons/md";

interface RegistrationProps {
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  const handleRegistration = () => {
    // Реализуйте логику регистрации
  };

  return (
    <div className="fixed z-50 text-[12px] -translate-x-1/2 bg-gray-800 text-white p-6 rounded-md shadow-md">
      <h2 className="text-[18px] mb-4 text-center">Регистрация</h2>
      <form onSubmit={handleRegistration} className="divide-y divide-gray-600">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-white">
            Твое имя:
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-600 text-black px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-600 text-black px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-white">
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-600 text-black px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-white">
            Повтори пароль:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border border-gray-600 text-black px-3 py-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700"
        >
          Зарегистрироваться
        </button>
      </form>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-100"
      >
        <MdClose size={24} />
      </button>
    </div>
  );
};

export default Registration;
