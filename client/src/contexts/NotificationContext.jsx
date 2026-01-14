import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

NotificationContext.displayName = 'NotificationContext';

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((payload) => {
        const id = Date.now();

        const notification = {
            id,
            createdAt: new Date().toISOString(),
            ...payload,
        };

        setNotifications((prev) => [notification, ...prev].slice(0, 20));
    }, []);

    const clearNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                clearNotification,
                clearAllNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);

export default NotificationContext;

