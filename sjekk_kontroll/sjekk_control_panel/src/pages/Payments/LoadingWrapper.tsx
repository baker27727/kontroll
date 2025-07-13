import React, { ReactNode } from 'react';

interface LoadingWrapperProps {
  children: ReactNode;
  isLoading: boolean;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none w-full">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin">
          <svg className="w-10 h-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingWrapper;

