import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#0096c7] transition-colors duration-200">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <Link
              to={item.href}
              className={`ml-1 text-sm font-medium ${
                index === items.length - 1
                  ? 'text-[#0096c7] cursor-default pointer-events-none'
                  : 'text-gray-700 hover:text-[#0096c7] transition-colors duration-200'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};