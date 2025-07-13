import React from 'react';
import { IconType } from 'react-icons';

const FullScreenToggle: React.FC<{ icon: IconType; onClick: () => void }> = ({ icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default FullScreenToggle;
