import {
    Bell,
    CheckCheck,
    Clock,
    X
} from 'lucide-react';

import {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    useNotifications
} from '../../../context/NotificationContext.jsx';

import { useNavigate } from 'react-router-dom';

import './NotificationCenter.css';

function NotificationCenter() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification
    } = useNotifications();

    const [open, setOpen] = useState(false);

    const notificationRef =
        useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    const formatTime = (dateValue) => {
        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return '';
        }

        const diff =
            Date.now() - date.getTime();

        const seconds =
            Math.floor(diff / 1000);

        const minutes =
            Math.floor(seconds / 60);

        const hours =
            Math.floor(minutes / 60);

        const days =
            Math.floor(hours / 24);

        if (seconds < 60) {
            return 'Just now';
        }

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        if (hours < 24) {
            return `${hours} hr ago`;
        }

        if (days === 1) {
            return 'Yesterday';
        }

        return `${days} days ago`;
    };

    const handleNotificationClick = (
        notification
    ) => {
        markAsRead(notification.id);

        setOpen(false);

        if (notification.taskId) {
            navigate(
                `/tasks?taskId=${notification.taskId}`
            );
        }
    };

    return (
        <div
            className="notification-wrapper"
            ref={notificationRef}
        >

            <button
                className="topbar-icon-button notification-button"
                onClick={() =>
                    setOpen(
                        (current) => !current
                    )
                }
                aria-label="Notifications"
                aria-expanded={open}
            >
                <Bell size={19} />

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99
                            ? '99+'
                            : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="notification-panel">

                    <div className="notification-header">

                        <div>
                            <h3>
                                Notifications
                            </h3>

                            <span>
                                {unreadCount > 0
                                    ? `${unreadCount} unread`
                                    : 'All caught up'}
                            </span>
                        </div>

                        {unreadCount > 0 && (
                            <button
                                className="mark-all-button"
                                onClick={
                                    markAllAsRead
                                }
                            >
                                <CheckCheck
                                    size={14}
                                />
                                Mark all read
                            </button>
                        )}

                    </div>

                    <div className="notification-divider" />

                    <div className="notification-list">

                        {notifications.length === 0 ? (
                            <div className="notification-empty">

                                <div className="notification-empty-icon">
                                    <Bell size={20} />
                                </div>

                                <strong>
                                    No notifications
                                </strong>

                                <span>
                                    You're all caught up.
                                </span>

                            </div>
                        ) : (
                            notifications.map(
                                (notification) => (
                                    <div
                                        key={
                                            notification.id
                                        }
                                        className={`notification-item ${
                                            notification.read
                                                ? 'notification-read'
                                                : 'notification-unread'
                                        }`}
                                        onClick={() =>
                                            handleNotificationClick(
                                                notification
                                            )
                                        }
                                    >

                                        <div className="notification-icon">
                                            {notification.type ===
                                            'DUE' ? (
                                                <Clock
                                                    size={16}
                                                />
                                            ) : (
                                                <Bell
                                                    size={16}
                                                />
                                            )}
                                        </div>

                                        <div className="notification-content">

                                            <div className="notification-title-row">

                                                <strong>
                                                    {
                                                        notification.title
                                                    }
                                                </strong>

                                                {!notification.read && (
                                                    <span className="notification-unread-dot" />
                                                )}

                                            </div>

                                            <p>
                                                {
                                                    notification.message
                                                }
                                            </p>

                                            <span className="notification-time">
                                                {formatTime(
                                                    notification.createdAt
                                                )}
                                            </span>

                                        </div>

                                        <button
                                            className="notification-remove"
                                            onClick={(
                                                event
                                            ) => {
                                                event.stopPropagation();

                                                removeNotification(
                                                    notification.id
                                                );
                                            }}
                                            aria-label="Remove notification"
                                        >
                                            <X
                                                size={14}
                                            />
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                    {notifications.length > 0 && (
                        <div className="notification-footer">

                            <span>
                                {notifications.length}{' '}
                                {notifications.length ===
                                1
                                    ? 'notification'
                                    : 'notifications'}
                            </span>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}

export default NotificationCenter;