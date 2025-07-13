import React from 'react';

interface KbdProps {
  children: React.ReactNode;
}

export default function Kbd({ children }: KbdProps) {
  return (
    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200  rounded-sm shadow-sm dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
      {children}
    </kbd>
  );
}