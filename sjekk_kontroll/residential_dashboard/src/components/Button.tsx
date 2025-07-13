import React from 'react';
import { Loader2 } from 'lucide-react';

type ColorType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: ColorType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  color = 'blue',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none';
  
  const colorStyles = {
    red: {
      bg: 'bg-red-600 hover:bg-red-700',
      text: 'text-red-600',
      border: 'border-red-600',
      hover: 'hover:bg-red-50',
    },
    blue: {
      bg: 'bg-blue-600 hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'border-blue-600',
      hover: 'hover:bg-blue-50',
    },
    green: {
      bg: 'bg-green-600 hover:bg-green-700',
      text: 'text-green-600',
      border: 'border-green-600',
      hover: 'hover:bg-green-50',
    },
    yellow: {
      bg: 'bg-yellow-500 hover:bg-yellow-600',
      text: 'text-yellow-500',
      border: 'border-yellow-500',
      hover: 'hover:bg-yellow-50',
    },
    purple: {
      bg: 'bg-purple-600 hover:bg-purple-700',
      text: 'text-purple-600',
      border: 'border-purple-600',
      hover: 'hover:bg-purple-50',
    },
    pink: {
      bg: 'bg-pink-600 hover:bg-pink-700',
      text: 'text-pink-600',
      border: 'border-pink-600',
      hover: 'hover:bg-pink-50',
    },
    indigo: {
      bg: 'bg-indigo-600 hover:bg-indigo-700',
      text: 'text-indigo-600',
      border: 'border-indigo-600',
      hover: 'hover:bg-indigo-50',
    },
    gray: {
      bg: 'bg-gray-600 hover:bg-gray-700',
      text: 'text-gray-600',
      border: 'border-gray-600',
      hover: 'hover:bg-gray-50',
    },
  };
  
  const variantStyles = {
    primary: `${colorStyles[color].bg} text-white`,
    secondary: `bg-gray-200 ${colorStyles[color].text} hover:bg-gray-300`,
    outline: `border ${colorStyles[color].border} ${colorStyles[color].text} ${colorStyles[color].hover}`,
    ghost: `${colorStyles[color].text} ${colorStyles[color].hover}`,
    text: `bg-transparent ${colorStyles[color].text} hover:${colorStyles[color].hover}`,
    link: `bg-transparent text-blue-600 underline-offset-4 hover:underline`,
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  const buttonAudio = new Audio('/button_click.mp3')

  return (
    <div onClick={() => buttonAudio.play()}>
      <button
        className={combinedClassName}
        onClick={() => buttonAudio.play()}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    </div>
  );
};

export default Button;
