import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

interface ToggleThemeProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-600 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  );
};

export default ToggleTheme;
