import { useEffect, useState } from 'react';
import {
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import taskService from '../services/task.service';

import TaskCard from '../components/tasks/TaskCard';

import {
    extractTaskList
} from '../utils/taskResponse';

import './Completed.css';

function Completed() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCompletedTasks = async () => {
        try {
            setLoading(true);

            const response =
                await taskService.getTasks();

            const allTasks =
                extractTaskList(response);

            setTasks(
                allTasks.filter(
                    (task) =>
                        task.status === 'COMPLETED'
                )
            );

        } catch (error) {
            console.error(
                'Unable to load completed tasks:',
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompletedTasks();
    }, []);

    const handleComplete = async (task) => {
        try {
            await taskService.updateTask(
                task._id,
                {
                    status: 'TODO'
                }
            );

            setTasks((current) =>
                current.filter(
                    (item) =>
                        item._id !== task._id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (task) => {
        const confirmed =
            window.confirm(
                `Delete "${task.title}"?`
            );

        if (!confirmed) return;

        try {
            await taskService.deleteTask(
                task._id
            );

            setTasks((current) =>
                current.filter(
                    (item) =>
                        item._id !== task._id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (task) => {
        navigate('/tasks');
    };

    return (
        <div className="completed-page page-container fade-in">

            <div className="completed-header">

                <div>

                    <div className="completed-eyebrow">
                        <CheckCircle2 size={15} />
                        Task history
                    </div>

                    <h1 className="section-title">
                        Completed
                    </h1>

                    <p className="section-description">
                        Everything you've successfully finished.
                    </p>

                </div>

                <button
                    className="completed-tasks-link"
                    onClick={() =>
                        navigate('/tasks')
                    }
                >
                    All tasks
                    <ArrowRight size={15} />
                </button>

            </div>

            {loading ? (
                <div className="completed-loading">
                    Loading completed tasks...
                </div>
            ) : tasks.length === 0 ? (
                <div className="completed-empty">

                    <div className="completed-empty-icon">
                        <CheckCircle2 size={22} />
                    </div>

                    <h3>
                        Nothing completed yet
                    </h3>

                    <p>
                        Complete a task and it will appear here.
                    </p>

                    <button
                        onClick={() =>
                            navigate('/tasks')
                        }
                    >
                        View tasks
                    </button>

                </div>
            ) : (
                <div className="completed-list">

                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onComplete={handleComplete}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default Completed;