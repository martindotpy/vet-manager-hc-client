import React from "react";

interface InputProps {
  inputType: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ inputType, value, onChange }) => {
  return (
    <input
      type={inputType}
      value={value}
      onChange={onChange} 
      className="border-2 border-gray-300 text-black rounded-lg p-4 w-64 h-8 bg-white"
    />
  );
};

export default Input;
