import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext.jsx';
import {
    showTaskReminderNotification
} from '../services/notification.service';

const REMINDER_INTERVAL = 30 * 1000;

const REMINDER_WINDOWS = {
    '30_MINUTES': 30,
    '15_MINUTES': 15,
    '10_MINUTES': 10
};

function useReminderScheduler(tasks) {
    const notifiedRef = useRef(
        new Set()
    );
    const { addNotification } = useNotifications();
    useEffect(() => {
        if (!tasks || tasks.length === 0) {
            return;
        }

        const checkReminders = () => {
            const now = Date.now();

            tasks.forEach((task) => {
                if (
                    !task ||
                    !task._id ||
                    !task.dueDate ||
                    task.status === 'COMPLETED' ||
                    task.reminder === 'NONE'
                ) {
                    return;
                }

                const dueTime =
                    new Date(
                        task.dueDate
                    ).getTime();

                if (
                    Number.isNaN(dueTime)
                ) {
                    return;
                }

                const reminderMinutes =
                    REMINDER_WINDOWS[
                        task.reminder
                        ];

                if (
                    reminderMinutes === undefined
                ) {
                    return;
                }

                const reminderKey =
                    `${task._id}-${reminderMinutes}`;

                const reminderTime =
                    dueTime -
                    reminderMinutes *
                    60000;

                if (
                    now >= reminderTime &&
                    now < reminderTime + 60000 &&
                    !notifiedRef.current.has(
                        reminderKey
                    )
                ) {
                    const shown =
                        showTaskReminderNotification({
                            task,
                            minutesBefore: reminderMinutes
                        });

                    if (shown) {
                        addNotification({
                            title: 'Task reminder',
                            message:
                                `"${task.title}" is due in ${reminderMinutes} minutes.`,
                            taskId: task._id,
                            type: 'REMINDER'
                        });

                        notifiedRef.current.add(reminderKey);
                    }
                }

                const dueKey =
                    `${task._id}-DUE`;

                if (
                    now >= dueTime &&
                    now < dueTime + 60000 &&
                    !notifiedRef.current.has(
                        dueKey
                    )
                ) {
                    const shown =
                        showTaskReminderNotification({
                            task,
                            minutesBefore: 0
                        });

                    if (shown) {
                        addNotification({
                            title: 'Task due now',
                            message:
                                `"${task.title}" is due now.`,
                            taskId: task._id,
                            type: 'DUE'
                        });

                        notifiedRef.current.add(dueKey);
                    }
                }
            });
        };

        checkReminders();

        const intervalId =
            setInterval(
                checkReminders,
                REMINDER_INTERVAL
            );

        return () => {
            clearInterval(intervalId);
        };
    }, [tasks, addNotification]);
}

export default useReminderScheduler;