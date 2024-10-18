import React from 'react';

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button
      className="bg-secondary text-black font-bold rounded-lg p-2 mt-5 w-full transition-transform ease-in-out delay-150 hover:scale-105">
      {title}
    </button>
  );
};

export default Button;