import { LogOut } from 'lucide-react';
import CustomButton from './Button';
import { removeAuthentication } from '../utils/authentication';

const Header = () => {

  const logoutPlace = () => {
    removeAuthentication()
    location.reload()
  }
  
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Company Logo" className="h-6 mr-2" />
          {/* <span className="text-xl font-bold text-gray-800">PlaceDash</span> */}
        </div>
        <CustomButton
          color="red"
          variant="text"
          className="flex items-center text-red-800"
          onClick={logoutPlace}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logg ut
        </CustomButton>
      </div>
    </header>
  );
};

export default Header;