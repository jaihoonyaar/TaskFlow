import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

const NotificationContext = createContext(null);

const STORAGE_KEY = 'taskflow_notifications';

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        try {
            const stored =
                localStorage.getItem(STORAGE_KEY);

            return stored
                ? JSON.parse(stored)
                : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(notifications)
        );
    }, [notifications]);

    const addNotification = ({
                                 title,
                                 message,
                                 taskId = null,
                                 type = 'REMINDER'
                             }) => {
        setNotifications((current) => {
            const alreadyExists = current.some(
                (notification) =>
                    notification.taskId === taskId &&
                    notification.message === message &&
                    notification.type === type &&
                    !notification.read
            );

            if (alreadyExists) {
                return current;
            }

            const notification = {
                id: crypto.randomUUID(),
                title,
                message,
                taskId,
                type,
                read: false,
                createdAt: new Date().toISOString()
            };

            return [
                notification,
                ...current
            ];
        });
    };


    const markAsRead = (notificationId) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === notificationId
                    ? {
                        ...notification,
                        read: true
                    }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                read: true
            }))
        );
    };

    const removeNotification = (notificationId) => {
        setNotifications((current) =>
            current.filter(
                (notification) =>
                    notification.id !== notificationId
            )
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAsRead,
                markAllAsRead,
                removeNotification,
                clearNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(
        NotificationContext
    );

    if (!context) {
        throw new Error(
            'useNotifications must be used inside NotificationProvider'
        );
    }

    return context;
}