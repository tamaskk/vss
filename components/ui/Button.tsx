import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  style?: string;
  type?: 'primary' | 'secondary';
  length?: 'full' | 'normal';
  disabled?: boolean;
}

const Button = ({ onClick, text, style, type, length, disabled }: ButtonProps) => {
  const buttonType = {
    primary: 'bg-[#a83ff9] hover:bg-[#920ff7] border-2 border-[#a83ff9] hover:border-[#920ff7] text-white',
    secondary: 'bg-transparent hover:bg-[#a83ff9] text-[#a83ff9] hover:text-white border-2 border-[#a83ff9] hover:border-[#a83ff9]',
  };



  return (
    <button onClick={onClick} disabled={disabled} className={`${buttonType[type || 'primary']} ${length === 'full' ? "w-full" : "w-auto"} font-bold py-2 px-4 rounded transition-all duration-300 ${style}`}>
      {text}
    </button>
  );
};

export default Button;
