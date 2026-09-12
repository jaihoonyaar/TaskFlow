const isNotificationSupported = () => {
    return 'Notification' in window;
};

export const getNotificationPermission = () => {
    if (!isNotificationSupported()) {
        return 'unsupported';
    }

    return Notification.permission;
};

export const requestNotificationPermission = async () => {
    if (!isNotificationSupported()) {
        return 'unsupported';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission === 'denied') {
        return 'denied';
    }

    return await Notification.requestPermission();
};

export const showTestNotification = () => {
    if (!isNotificationSupported()) {
        return false;
    }

    if (Notification.permission !== 'granted') {
        return false;
    }

    new Notification('TaskFlow', {
        body: 'Browser notifications are enabled.',
        tag: 'taskflow-test-notification'
    });

    return true;
};
export const showTaskReminderNotification = ({
                                                 task,
                                                 minutesBefore
                                             }) => {
    if (!isNotificationSupported()) {
        return false;
    }

    if (Notification.permission !== 'granted') {
        return false;
    }

    let body;

    if (minutesBefore > 0) {
        body = `"${task.title}" is due in ${minutesBefore} minutes.`;
    } else {
        body = `"${task.title}" is due now.`;
    }

    new Notification('TaskFlow Reminder', {
        body,
        tag: `taskflow-reminder-${task._id}-${minutesBefore}`
    });

    return true;
};