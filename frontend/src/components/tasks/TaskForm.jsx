import { useEffect, useState } from 'react';

import Input from '../common/Input';
import Button from '../common/Button';
import {
    formatDateTimeLocal
} from '../../utils/date';
import './TaskForm.css';
import {
    getNotificationPermission,
    requestNotificationPermission,
    showTestNotification
} from '../../services/notification.service';
const initialForm = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    category: 'OTHER',
    dueDate: '',
    reminder: 'NONE'
};

function TaskForm({
                      task,
                      onSubmit,
                      onCancel,
                      submitting
                  }) {
    const [form, setForm] = useState(initialForm);
    const [formError, setFormError] =
        useState('');
    const [notificationPermission, setNotificationPermission] =
        useState(
            getNotificationPermission()
        );
    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'TODO',
                priority: task.priority || 'MEDIUM',
                category: task.category || 'OTHER',
                dueDate: formatDateTimeLocal(task.dueDate),
                reminder: task?.reminder || 'NONE'
            });
        } else {
            setForm(initialForm);
        }
    }, [task]);

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));

        if (
            field === 'reminder' ||
            field === 'dueDate'
        ) {
            setFormError('');
        }
    };
    const handleEnableNotifications = async () => {
        const permission =
            await requestNotificationPermission();

        setNotificationPermission(
            permission
        );

        if (permission === 'granted') {
            showTestNotification();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormError('');

        if (!form.title.trim()) {
            setFormError(
                'Task title is required.'
            );
            return;
        }

        if (
            form.reminder !== 'NONE' &&
            !form.dueDate
        ) {
            setFormError(
                'Please select a due date before adding a reminder.'
            );
            return;
        }
        if (
            form.reminder !== 'NONE' &&
            form.dueDate
        ) {
            const dueTime =
                new Date(form.dueDate).getTime();

            const now =
                Date.now();

            const reminderMinutes = {
                '10_MINUTES': 10,
                '15_MINUTES': 15,
                '30_MINUTES': 30
            }[form.reminder];

            const reminderTime =
                dueTime -
                reminderMinutes * 60000;

            if (reminderTime <= now) {
                setFormError(
                    `The selected due time must be at least ${reminderMinutes} minutes from now.`
                );

                return;
            }
        }
        onSubmit({
            ...form,
            title: form.title.trim()
        });
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <Input
                label="Task title"
                placeholder="What needs to be done?"
                value={form.title}
                onChange={(event) =>
                    handleChange('title', event.target.value)
                }
                autoFocus
            />

            <div className="form-field">
                <label>
                    Description
                </label>

                <textarea
                    placeholder="Add some details..."
                    value={form.description}
                    onChange={(event) =>
                        handleChange(
                            'description',
                            event.target.value
                        )
                    }
                    rows={4}
                />
                <div className="character-count">
                    {form.description.length} / 1000
                </div>
            </div>

            <div className="task-form-grid">

                <div className="form-field">
                    <label>Status</label>

                    <select
                        value={form.status}
                        onChange={(event) =>
                            handleChange(
                                'status',
                                event.target.value
                            )
                        }
                    >
                        <option value="TODO">To do</option>
                        <option value="IN_PROGRESS">
                            In progress
                        </option>
                        <option value="COMPLETED">
                            Completed
                        </option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Priority</label>

                    <select
                        value={form.priority}
                        onChange={(event) =>
                            handleChange(
                                'priority',
                                event.target.value
                            )
                        }
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Category</label>

                    <select
                        value={form.category}
                        onChange={(event) =>
                            handleChange(
                                'category',
                                event.target.value
                            )
                        }
                    >
                        <option value="WORK">Work</option>
                        <option value="PERSONAL">
                            Personal
                        </option>
                        <option value="STUDY">Study</option>
                        <option value="PROJECT">
                            Project
                        </option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Due date</label>

                    <input
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(event) =>
                            handleChange(
                                'dueDate',
                                event.target.value
                            )
                        }
                    />
                </div>

                <div className="form-field">
                    <label>Reminder</label>

                    <select
                        value={form.reminder}
                        onChange={(event) =>
                            handleChange(
                                'reminder',
                                event.target.value
                            )
                        }
                    >
                        <option value="NONE">
                            No reminder
                        </option>

                        <option value="10_MINUTES">
                            10 minutes before
                        </option>

                        <option value="15_MINUTES">
                            15 minutes before
                        </option>

                        <option value="30_MINUTES">
                            30 minutes before
                        </option>
                    </select>
                </div>

            </div>
            {form.reminder !== 'NONE' &&
                notificationPermission !== 'granted' && (
                    <div className="notification-permission-box">

                        <div>
                            <strong>
                                Enable reminders
                            </strong>

                            <span>
                    TaskFlow needs browser notification
                    permission to alert you about this task.
                </span>
                        </div>

                        <button
                            type="button"
                            className="notification-enable-button"
                            onClick={handleEnableNotifications}
                        >
                            Enable
                        </button>

                    </div>
                )}
            {form.reminder !== 'NONE' &&
                notificationPermission === 'denied' && (
                    <div className="notification-denied-box">

                        Browser notifications are blocked.
                        Enable notifications for TaskFlow in
                        your browser site settings.

                    </div>
                )}


            {formError && (
                <div className="task-form-error">
                    {formError}
                </div>
            )}

            <div className="task-form-actions">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={
                        submitting || !form.title.trim()
                    }
                >
                    {submitting
                        ? 'Saving...'
                        : task
                            ? 'Save changes'
                            : 'Create task'}
                </Button>
            </div>

        </form>
    );
}

export default TaskForm;