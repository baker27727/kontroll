import { useState } from "react";

const useNotificationStatus = () => {
    const [permission, setPermission] = useState(Notification.permission);
    const [isAllowed, setIsAllowed] = useState(permission === 'granted');
    const [isDenied] = useState(permission === 'denied');
    const [isDefault] = useState(permission === 'default');

    const requestPermission = async () => {
        if (Notification.permission == 'default') {
            const result = await Notification.requestPermission();
            setPermission(result);
            setIsAllowed(result === 'granted');
        }
    };

    return {
        permission,
        isAllowed,
        isDenied,
        isDefault,
        requestPermission
    };
}

export default useNotificationStatus;