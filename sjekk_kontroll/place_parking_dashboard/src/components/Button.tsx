import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'red' | 'green' | 'amber';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CustomButton({
  children,
  variant = 'primary',
  size = 'md',
  color = 'blue',
  icon,
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded focus:outline-none';
  
  const variantStyles = {
    primary: `bg-${color}-500 text-white hover:bg-${color}-600 focus:ring-${color}-500 transition-colors duration-200`,
    secondary: `bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500`,
    outline: `border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500`,
    text: `text-${color}-600 hover:text-${color}-700 focus:ring-${color}-500`,
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-1.5 text-base',
    lg: 'px-6 py-2 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}