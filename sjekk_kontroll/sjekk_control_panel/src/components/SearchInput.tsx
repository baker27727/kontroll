import React, { useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

const dummyResults: SearchResult[] = [
  { id: '1', title: 'React Hooks', description: 'Learn about React Hooks and how to use them' },
  { id: '2', title: 'Tailwind CSS', description: 'A utility-first CSS framework for rapid UI development' },
  { id: '3', title: 'Next.js', description: 'The React Framework for Production' },
  { id: '4', title: 'TypeScript', description: 'Typed JavaScript at Any Scale' },
  { id: '5', title: 'GraphQL', description: 'A query language for your API' },
];

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredResults = dummyResults.filter(
        result => result.title.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-96 px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded border-2 shadow">
          <ul className="py-1 overflow-auto text-base leading-6 rounded-md max-h-60 focus:outline-none sm:text-sm sm:leading-5">
            {results.map((result) => (
              <li key={result.id} className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white">
                <div className="flex items-center">
                  <span className="font-medium truncate">{result.title}</span>
                </div>
                <p className="mt-1 text-sm truncate">{result.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchTerm && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <div className="px-4 py-2 text-sm text-gray-700">No results found</div>
        </div>
      )}
    </div>
  );
}