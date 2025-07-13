import { useState } from 'react';

const Snippet = ({ commands }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands.join('\n')).then(() => {
      setCopied(true);
      console.log(copied);
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-100 rounded p-4 my-2 relative font-mono text-sm shadow-sm border border-gray-300 dark:bg-gray-800 flex flex-col">
      
      {
        commands.map((command) => (
            <div>
                <pre className="whitespace-pre-wrap break-all text-gray-800"><span className="text-gray-500 select-none">$ </span>{command}</pre>
            </div>
        ))
      }

                      <button
                    onClick={handleCopy}
                    className=" text-gray-500 hover:text-gray-700 focus:outline-none absolute top-2 right-2"
                    aria-label="Copy to clipboard"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
    </div>
  );
};


export default Snippet
