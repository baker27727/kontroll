import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  bgColor?: string; // Can be Tailwind color class or hex code
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  headerAction,
  bgColor = 'bg-white', // Default is Tailwind white color class
}) => {
  // Check if bgColor is a hex value or a Tailwind class
  const isHexColor = bgColor.startsWith('#');
  
  return (
    <div
      className={`shadow rounded overflow-hidden ${className} ${!isHexColor ? bgColor : ''} dark:bg-gray-800`} // Apply bgColor if it's a class
      style={isHexColor ? { backgroundColor: bgColor } : {}} // Apply custom hex color inline if applicable
    >
      {title && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};
