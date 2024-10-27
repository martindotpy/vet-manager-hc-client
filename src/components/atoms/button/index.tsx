import React from 'react';

interface ButtonProps {
  title: string;
  buttonType: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, buttonType, onClick }) => {
  const baseClasses = "rounded-lg p-2 mt-5 w-full transition-transform ease-in-out delay-150";
  const primaryClasses = "bg-secondary text-black hover:scale-105 font-bold hover:bg-accent hover:text-white";
  const secondaryClasses = "bg-secondary text-black hover:scale-95 w-48";

  const buttonClasses = buttonType === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <button className={`${baseClasses} ${buttonClasses}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;