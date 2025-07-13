import React, { useEffect, useState } from 'react';
import useNotificationStatus from "../hooks/notification_status";
import { BellIcon, CheckCircleIcon, Computer, X } from 'lucide-react';
import { FaMobile } from 'react-icons/fa';
import NotificationService from '../services/notification_service';
import { useAppSelector } from '../hooks/hooks';

const NotificationRequired = ({ children }: { children: React.ReactNode }) => {
    const { isAllowed, requestPermission } = useNotificationStatus();
    const [showInstructions, setShowInstructions] = useState(false);


    const {apartment} = useAppSelector((state) => state.auth_store)
    useEffect(() => {
        if(apartment){
            NotificationService.listenOnNotificationPermissionChange(apartment.id);
        }
        requestPermission();
    }, [])
    
    

    if (isAllowed) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className='flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md'>
                <div className="bg-white p-6 md:p-8 w-full md:max-w-md">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                        <BellIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
                        Enable Notifications
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 text-center mb-6">
                        We'd like to send you notifications for important updates and alerts. This helps us keep you informed about:
                    </p>
                    <ul className="list-none space-y-2 mb-6">
                        {['New messages', 'Account activity', 'Important reminders'].map((item, index) => (
                            <li key={index} className="flex items-center text-sm md:text-base text-gray-700">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={requestPermission}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center mb-4"
                    >
                        <BellIcon className="w-5 h-5 mr-2" />
                        Enable Notifications
                    </button>
                    <p className="text-xs md:text-sm text-gray-500 text-center mb-4">
                        You can always change this later in your browser settings.
                    </p>
                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="w-full text-blue-600 underline text-sm"
                    >
                        {showInstructions ? "Hide Instructions" : "How to enable notifications"}
                    </button>
                </div>

                {showInstructions && (
                    <div className="relative border-t-2 md:border-l-2 md:border-t-0 text-sm text-gray-600 bg-white w-full p-6 md:p-8 shadow-md">
                        <button 
                            onClick={() => setShowInstructions(false)}
                            className="md:hidden absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="mb-6 md:mb-8">
                            <h3 className="font-semibold flex items-center mb-2 text-base md:text-lg">
                                <FaMobile className="w-5 h-5 mr-2 flex-shrink-0" />
                                On Mobile Devices:
                            </h3>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Open your device settings</li>
                                <li>Tap on "Apps" or "Application Manager"</li>
                                <li>Find and tap on our app</li>
                                <li>Tap on "Notifications"</li>
                                <li>Toggle on "Allow Notifications"</li>
                            </ol>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center mb-2 text-base md:text-lg">
                                <Computer className="w-5 h-5 mr-2 flex-shrink-0" />
                                On Desktop Browsers:
                            </h3>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Click the lock icon in the address bar</li>
                                <li>Find "Notifications" in the list</li>
                                <li>Select "Allow" from the dropdown</li>
                                <li>Refresh the page</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationRequired;