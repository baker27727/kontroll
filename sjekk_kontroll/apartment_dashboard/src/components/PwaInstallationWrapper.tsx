import React, { useState, useEffect } from 'react';

interface PwaInstallationWrapperProps {
  children: React.ReactNode;
}

const PwaInstallationWrapper: React.FC<PwaInstallationWrapperProps> = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="relative">
      {children}
      {showPrompt && (
        <div className="fixed inset-x-0 top-0 z-50 transform transition-all duration-500 ease-in-out animate-slide-down">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">
            <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
                  <p className="text-sm sm:text-base font-medium">
                    Install our app for a better experience!
                  </p>
                  <p className="text-xs sm:text-sm text-blue-200 mt-1">
                    Get faster access and offline capabilities
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleInstall}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors duration-200"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-blue-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PwaInstallationWrapper;

