// src/components/Button/Button.tsx
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  ...props 
}) => {
  return (
    <button {...props} className="bg-red p-2 border">
      {children}
    </button>
  );
};

export default Button;
