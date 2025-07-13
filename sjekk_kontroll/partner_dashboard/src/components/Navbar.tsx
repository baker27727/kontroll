import { Home, MapPin, FileText, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { removeAuthentication } from '../utils/authentication';

const Navbar = () => {
  const logoutPartner = () => {
    removeAuthentication();
    location.reload();
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/src/assets/parksync_green_black.png" alt="Logo" className="h-6" />
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Home className="w-5 h-5 mr-1" />
            Hjem
          </Link>
          <Link to="/places" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <MapPin className="w-5 h-5 mr-1" />
            Steder
          </Link>
          <Link to="/requests" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FileText className="w-5 h-5 mr-1" />
            Forespørsler
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={logoutPartner} className="text-red-600 hover:text-red-600 transition-colors flex items-center">
          <span>
          Logout
          </span>
          <LogOutIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;