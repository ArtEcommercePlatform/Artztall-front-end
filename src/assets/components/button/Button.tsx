import React from 'react';

// Define type for button variants
type ButtonVariant = 'primary' | 'secondary' | 'text';

// Define type for button sizes
type ButtonSize = 'sm' | 'md' | 'lg';

// Define props interface
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Define type for variant styles
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[#094129] text-white hover:bg-[#094129]/90',
  secondary: 'border-2 border-[#094129] text-[#094129] hover:bg-[#094129] hover:text-white',
  text: 'text-[#094129] hover:bg-[#094129]/10'
};

// Define type for size styles
const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-2.5 text-lg'
};

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  onClick, 
  children,
  className = '',
  disabled = false 
}) => {
  const baseStyles = 'rounded-full font-medium transition-colors duration-200 flex items-center justify-center';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;