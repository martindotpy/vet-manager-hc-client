import React from "react";

interface InputProps {
  id?: string;
  inputType: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, inputType, value, onChange }) => {
  return (
    <input
      id={id}
      type={inputType}
      value={value}
      onChange={onChange}
      className="border-2 border-gray-300 text-black rounded-lg p-4 w-64 h-8 bg-white"
    />
  );
};

export default Input;