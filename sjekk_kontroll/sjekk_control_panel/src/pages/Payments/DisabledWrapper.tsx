import React, { ReactNode } from 'react';

interface DisabledWrapperProps {
  children: ReactNode;
}

const DisabledWrapper: React.FC<DisabledWrapperProps> = ({
  children,
}) => {

  return (
    <div className="relative group rounded-md overflow-hidden">
      <div className="opacity-50 pointer-events-none filter grayscale overflow-hidden">
        {children}
      </div>
      <div className="absolute inset-0 bg-gray-600 bg-opacity-20 transition-all duration-300 "></div>
    </div>
  );
};

export default DisabledWrapper;

