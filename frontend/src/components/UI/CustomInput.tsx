import React from "react";
import { IconType } from "react-icons";

interface CustomInputProps {
  placeholder: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  Icon: IconType;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  inputRef,
  Icon,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <Icon className="absolute left-4 text-red-600" size={24} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="text-[14px] font-medium w-full pl-12 pr-4 py-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 placeholder:text-gray-700"
      />
    </div>
  );
};

export default CustomInput;
