import { useState, useCallback } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import NotificationIcon from './NotificationIcon';
import MessagesIcon from './MessageIcon';
// import LanguageIcon from './LanguageIcon';
import ProfileIcon from './ProfileIcon';
import FullScreenToggle from './FullScreenToggle';
import { IconType } from 'react-icons';
// import DarkModeToggle from './ToggleDarkMode';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';


const LawyerHeader = () => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  console.log(isFullScreen);
  

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }, []);


  return (
    <header lang='ar' dir='ltr' className="sticky top-0 flex items-center justify-between p-3 bg-white shadow-sm dark:bg-gray-900">
      <div className="flex items-center">
        <Link to={Routes.HOME}>
          <img src="/src/assets/logo.png" alt="" className='h-5' />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <NotificationIcon />
        <MessagesIcon />
        {/* <LanguageIcon /> */}
        <ProfileIcon />
        {/* <ModeSwitcher /> */}
        {/* <DarkModeToggle /> */}
        <FullScreenToggle 
          icon={document.fullscreenElement ? Maximize as IconType : Minimize as IconType}
          onClick={toggleFullScreen}
        />
      </div>
    </header>
  );
};

export default LawyerHeader;