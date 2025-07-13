import React from 'react';

interface BlockQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export default function BlockQuote({ children, author }: BlockQuoteProps) {
  return (
    <blockquote className="p-4 my-4 border-l-4 border-blue-300 bg-slate-200 rounded dark:border-blue-500 dark:bg-blue-800">
      <svg className="w-6 h-6 text-gray-400 dark:text-gray-600 mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
      </svg>
      <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{children}</p>
      {author && (
        <cite className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}