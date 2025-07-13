import React from 'react';
import { IconType } from 'react-icons';

interface IconTextButtonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray';
  icon: IconType;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  size = 'sm',
  color = 'blue',
  icon: Icon,
  text,
  className = '',
  onClick,
}) => {
  const baseClasses = 'flex items-center justify-center px-1 py-1 border rounded cursor-pointer transition-all';

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    red: 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100',
    blue: 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100',
    green: 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100',
    yellow: 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100',
    purple: 'bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100',
    gray: 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    >
      {/* Icon */}
      <Icon className={`${iconSizeClasses[size]} ${text !== undefined ? 'mr-1' : ''}`} />

      {/* Text - hidden on small/medium screens, visible on larger screens */}
      <span className="hidden lg:block">{text?.toUpperCase()}</span>
    </button>
  );
};

export default IconTextButton;
