import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NotificationContext = createContext();
const STORAGE_KEY = 'moviefy_notifications';

NotificationContext.displayName = 'NotificationContext';

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load notifications from localStorage:', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        } catch (e) {
            console.error('Failed to save notifications to localStorage:', e);
        }
    }, [notifications]);

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

