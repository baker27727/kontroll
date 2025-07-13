import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SimpleLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-4 py-3">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[280px]">
          <Outlet /> {/* Nested routes will be rendered here */}
        </div>
      </main>

      <footer className="bg-gray-100 text-center py-4">
        <p className="text-gray-600">Simple Layout Example</p>
      </footer>
    </div>
  );
};

export default SimpleLayout;

