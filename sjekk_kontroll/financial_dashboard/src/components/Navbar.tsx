import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import Routes from '../constants/routes';
import ToggleTheme from './ToggleTheme';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    navigate(Routes.LOGIN);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Sanctions', route: Routes.SANCTIONS },
    { name: 'Attachments', route: Routes.ATTACHMENTS },
    { name: 'Statistics', route: Routes.STATISTICS },
    { name: 'Reports', route: Routes.REPORTS },
    { name: 'Managers', route: Routes.MANAGERS }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-900 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-6 w-auto" src="/assets/parksync.png" alt="Parksync" />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.route}
                  className={`${
                    location.pathname === item.route
                      ? 'bg-blue-800 dark:bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ToggleTheme isDark={isDark} toggleTheme={toggleTheme} />
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:bg-blue-600 dark:hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <ToggleTheme isDark={isDark} toggleTheme={toggleTheme} />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.route}
                className={`${
                  location.pathname === item.route
                    ? 'bg-blue-800 dark:bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

