import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', headerAction }) => {
  return (
    <div className={`bg-white shadow rounded  ${className}`}>
      {
        title && (
            <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
            {headerAction && <div>{headerAction}</div>}
      </div>
        )
      }
      <div className="p-4">{children}</div>
    </div>
  );
};