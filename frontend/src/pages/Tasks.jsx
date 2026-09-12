import { useEffect, useMemo, useState } from 'react';
import { Plus, CheckSquare, Search } from 'lucide-react';

import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Skeleton from '../components/common/Skeleton';
import TaskToolbar from '../components/tasks/TaskToolbar';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import {
    extractTaskList,
    extractTask
} from '../utils/taskResponse';
import taskService from '../services/task.service';
import { useToast } from '../context/ToastContext';
import './Tasks.css';
import useReminderScheduler
    from './../hooks/useReminderScheduler';
import { useSearchParams } from 'react-router-dom';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    useReminderScheduler(tasks);
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchParams, setSearchParams] =
        useSearchParams();
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('ALL');
    const [priority, setPriority] = useState('ALL');
    const [category, setCategory] = useState('ALL');
    const [sort, setSort] = useState('newest');
    const [deleteTask, setDeleteTask] =
        useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const clearFilters = () => {
        setSearch('');
        setStatus('ALL');
        setPriority('ALL');
        setCategory('ALL');
    };
    const loadTasks = async () => {
        try {
            setLoading(true);
            setError('');

            const response =
                await taskService.getTasks();

            const taskData =
                extractTaskList(response);


            setTasks(taskData);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                'Unable to load your tasks.'
            );

            setTasks([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);
    useEffect(() => {
        const taskId =
            searchParams.get('taskId');

        if (!taskId || tasks.length === 0) {
            return;
        }

        const task = tasks.find(
            (item) => item._id === taskId
        );

        if (!task) {
            return;
        }

        setEditingTask(task);
        setShowForm(true);

        setSearchParams(
            {},
            { replace: true }
        );
    }, [
        tasks,
        searchParams,
        setSearchParams
    ]);

    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        if (search.trim()) {
            const query = search
                .toLowerCase()
                .trim();

            result = result.filter((task) =>
                `${task.title} ${task.description || ''}`
                    .toLowerCase()
                    .includes(query)
            );
        }

        if (status !== 'ALL') {
            result = result.filter(
                (task) => task.status === status
            );
        }

        if (priority !== 'ALL') {
            result = result.filter(
                (task) => task.priority === priority
            );
        }

        if (category !== 'ALL') {
            result = result.filter(
                (task) => task.category === category
            );
        }

        result.sort((a, b) => {
            if (sort === 'oldest') {
                return (
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );
            }

            if (sort === 'dueSoon') {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;

                return (
                    new Date(a.dueDate) -
                    new Date(b.dueDate)
                );
            }

            if (sort === 'priority') {
                const priorityOrder = {
                    HIGH: 1,
                    MEDIUM: 2,
                    LOW: 3
                };

                return (
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );
            }

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );
        });

        return result;
    }, [
        tasks,
        search,
        status,
        priority,
        category,
        sort
    ]);

    const openCreateForm = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const openEditForm = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const closeForm = () => {
        if (submitting) return;

        setShowForm(false);
        setEditingTask(null);
    };
    useEffect(() => {
        const handleShortcut = (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === 'k'
            ) {
                event.preventDefault();

                document
                    .querySelector(
                        '.tasks-search-input'
                    )
                    ?.focus();
            }
        };

        window.addEventListener(
            'keydown',
            handleShortcut
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleShortcut
            );
        };
    }, []);

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);
            setError('');

            if (editingTask) {
                // UPDATE EXISTING TASK
                const response =
                    await taskService.updateTask(
                        editingTask._id,
                        formData
                    );

                const updatedTask =
                    extractTask(response);

                if (!updatedTask?._id) {
                    throw new Error(
                        'Task was updated but the API did not return a valid task.'
                    );
                }

                setTasks((current) =>
                    current.map((task) =>
                        task._id === editingTask._id
                            ? updatedTask
                            : task
                    )
                );

                showToast(
                    'Task updated successfully.'
                );

            } else {
                // CREATE NEW TASK
                const response =
                    await taskService.createTask(
                        formData
                    );

                const newTask =
                    extractTask(response);

                if (!newTask?._id) {
                    throw new Error(
                        'Task was created but the API did not return a valid task.'
                    );
                }

                setTasks((current) => [
                    newTask,
                    ...current
                ]);

                showToast(
                    'Task created successfully.'
                );
            }

            closeForm();

        } catch (err) {
            console.error(err);

            showToast(
                'Something went wrong. Please try again.',
                'error'
            );

        } finally {
            setSubmitting(false);
        }
    };
    const handleComplete = async (task) => {
        try {
            setError('');

            const newStatus =
                task.status === 'COMPLETED'
                    ? 'TODO'
                    : 'COMPLETED';

            const response =
                await taskService.updateTask(
                    task._id,
                    {
                        status: newStatus
                    }
                );

            const updatedTask =
                extractTask(response);

            if (!updatedTask?._id) {
                throw new Error(
                    'Task was updated but the API did not return a valid task.'
                );
            }

            setTasks((current) =>
                current.map((item) =>
                    item._id === task._id
                        ? updatedTask
                        : item
                )
            );
            showToast(
                newStatus === 'COMPLETED'
                    ? 'Task completed.'
                    : 'Task moved back to To do.'
            );
        } catch (err) {
            console.error(err);

            showToast(
                'Something went wrong. Please try again.',
                'error'
            );
        }
    };



    const handleDeleteRequest = (task) => {
        setDeleteTask(task);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTask) return;

        try {
            await taskService.deleteTask(
                deleteTask._id
            );

            setTasks((current) =>
                current.filter(
                    (item) =>
                        item._id !== deleteTask._id
                )
            );

            showToast(
                'Task deleted successfully.'
            );

            setDeleteTask(null);

        } catch (error) {
            console.error(error);

            showToast(
                'Unable to delete task.',
                'error'
            );
        }
    };
    return (
        <div className="tasks-page page-container fade-in">

            <div className="tasks-header">

                <div>
                    <div className="tasks-eyebrow">
                        <CheckSquare size={15} />
                        Task management
                    </div>

                    <h1 className="section-title">
                        Your tasks
                    </h1>

                    <p className="section-description">
                        Organize, prioritize and complete your work.
                    </p>
                </div>

                <Button
                    variant="primary"
                    onClick={openCreateForm}
                >
                    <Plus size={17} />
                    New task
                </Button>

            </div>

            {error && (
                <div className="tasks-error">
                    {error}
                </div>
            )}

            <TaskToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
                onClearFilters={clearFilters}
            />

            <div className="task-result-count">
                {loading
                    ? 'Loading tasks...'
                    : filteredTasks.length === tasks.length
                        ? `${tasks.length} ${
                            tasks.length === 1
                                ? 'task'
                                : 'tasks'
                        }`
                        : `Showing ${filteredTasks.length} of ${tasks.length} tasks`}
            </div>

            {loading ? (
                <div className="task-skeleton-list">
                    <Skeleton height="82px" />
                    <Skeleton height="82px" />
                    <Skeleton height="82px" />
                </div>

            ) : tasks.length === 0 ? (

                <div className="tasks-empty-state">

                    <div className="tasks-empty-icon">
                        <CheckSquare size={22} />
                    </div>

                    <h3>
                        You're all clear
                    </h3>

                    <p>
                        You don't have any tasks yet.
                    </p>

                    <Button
                        variant="primary"
                        onClick={openCreateForm}
                    >
                        Create your first task
                    </Button>

                </div>

            ) : filteredTasks.length === 0 ? (

                <div className="tasks-empty-state">

                    <div className="tasks-empty-icon">
                        <Search size={22} />
                    </div>

                    <h3>
                        No matching tasks
                    </h3>

                    <p>
                        We couldn't find any tasks matching your
                        current search or filters.
                    </p>

                    <button
                        className="clear-filters-button"
                        onClick={clearFilters}
                    >
                        Clear search & filters
                    </button>

                </div>

            ) : (

                <TaskList
                    tasks={filteredTasks}
                    loading={loading}
                    onComplete={handleComplete}
                    onEdit={openEditForm}
                    onDelete={handleDeleteRequest}
                />

            )}


            <Modal
                isOpen={showForm}
                onClose={closeForm}
                title={
                    editingTask
                        ? 'Edit task'
                        : 'Create a new task'
                }
                size="medium"
            >
                <TaskForm
                    task={editingTask}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                    submitting={submitting}
                />
            </Modal>
            <Modal
                isOpen={!!deleteTask}
                onClose={() => setDeleteTask(null)}
                title="Delete task?"
                size="small"
            >
                <div className="delete-modal-content">

                    <p>
                        Are you sure you want to delete
                        <strong>
                            {' '}
                            "{deleteTask?.title}"
                        </strong>
                        ?
                    </p>

                    <span>
      This action cannot be undone.
    </span>

                    <div className="delete-modal-actions">

                        <Button
                            variant="secondary"
                            onClick={() =>
                                setDeleteTask(null)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="danger"
                            onClick={handleDeleteConfirm}
                        >
                            Delete task
                        </Button>

                    </div>

                </div>
            </Modal>

        </div>

    );
}

export default Tasks;