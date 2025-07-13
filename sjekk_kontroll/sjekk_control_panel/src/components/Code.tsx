import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsx } from 'react-syntax-highlighter/dist/esm/languages/prism';
import { CodeIcon, Link2 } from 'lucide-react';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface CodeProps {
  children: string;
  language: 'js' | 'jsx';
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  dependencies?: string[];
}

const languageConfig = {
  js: {
    language: 'javascript',
    label: 'JavaScript',
  },
  jsx: {
    language: 'jsx',
    label: 'React',
  },
};

export default function Code({ children, language, showLineNumbers = true, wrapLongLines = true, dependencies = [] }: CodeProps) {
  const config = languageConfig[language];
  const [isCopied, setIsCopied] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(children);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm rounded-t-lg">
        <div className="flex items-center space-x-2">
            <CodeIcon />
            <span>{config.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {dependencies.length > 0 && (
            <button
              onClick={() => setShowDependencies(!showDependencies)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={showDependencies ? "Hide dependencies" : "Show dependencies"}
            >
                <Link2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
          >
            {isCopied ? (
              'Copied!'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      {showDependencies && dependencies.length > 0 && (
        <div className="bg-gray-700 text-white px-4 py-2 text-sm">
          <ul className="list-disc list-inside space-y-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dependencies.map((dep, index) => (
              <li key={index} className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>{dep}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <SyntaxHighlighter
        language={config.language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}   