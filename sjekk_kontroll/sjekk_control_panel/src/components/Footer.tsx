import { Card } from './Card';

const Footer = () => {
  return (
    <Card className='mt-4 rounded-none' bgColor='bg-gray-700'>
      <footer className="flex items-center justify-between max-sm:flex-col max-sm:gap-4">
                  {/* Left Section: Footer text */}
                  <div className="text-white/80 text-center sm:text-left text-sm">
            {new Date().getFullYear()} Sjekk Control Panel. All rights reserved.
          </div>
          
          {/* Right Section: Control Panel Version */}
          <div className="text-center sm:text-right text-sm  text-white">
          Control Panel Version: <span className="font-bold text-blue-400">1.0.0</span>
          </div>
      </footer>
    </Card>
  );
};

export default Footer;
