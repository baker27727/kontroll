import React from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray';
  icon: IconType; // Icon component from react-icons or other icon libraries
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  color = 'red',
  icon: Icon,
  className = '',
  onClick,
}) => {
  const baseClasses = 'p-1 border rounded cursor-pointer';

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    red: 'bg-red-50 border-red-300 text-red-700',
    blue: 'bg-blue-50 border-blue-300 text-blue-700',
    green: 'bg-green-50 border-green-300 text-green-700',
    yellow: 'bg-yellow-50 border-yellow-300 text-yellow-700',
    purple: 'bg-purple-50 border-purple-300 text-purple-700',
    gray: 'bg-gray-50 border-gray-300 text-gray-700',
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]} ${className}`}
    >
      <Icon className={sizeClasses[size]} />
    </div>
  );
};

export default IconButton;
