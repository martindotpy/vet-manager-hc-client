import React from 'react';

interface InputProps {
  inputType: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({inputType}) => {
  return (
    <input
      type={inputType}
      className="border-2 border-gray-300 text-black rounded-lg p-4 w-64 h-8 bg-white"
    />
  );
};

export default Input;