import React from "react";

interface LogoProps {
  logoType: "primary" | "secondary";
  className?: string;
  title: string;
}

const Logo: React.FC<LogoProps> = ({ logoType, className, title }) => {
  const baseClasses = "flex flex-col items-center";

  return (
    <div className={`${baseClasses} ${className}`}>
      <img
        src="/logo.png"
        alt={`${logoType} logo`}
        className="w-28 h-28 object-cover"
      />
      <h1 className="text-2xl mb-6">{title}</h1>
    </div>
  );
};

export default Logo;