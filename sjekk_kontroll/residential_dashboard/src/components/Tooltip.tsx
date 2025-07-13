// src/components/Tooltip.tsx
import React from 'react';

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="relative flex items-center">
      <div className="group">
        {children}
        <div className="absolute p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex z-2 justify-center items-center bg-blue-600 text-white text-sm rounded-sm px-2 z-10 whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {title}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-600 rotate-45 -mt-2 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
