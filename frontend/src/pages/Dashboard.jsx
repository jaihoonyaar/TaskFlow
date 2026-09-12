import {
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    useNavigate
} from 'react-router-dom';
import {
    extractTaskList
} from '../utils/taskResponse';
import {
    CheckSquare,
    CircleDot,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatCard from '../components/dashboard/StatCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import ActivityCard from '../components/dashboard/ActivityCard';

import taskService from '../services/task.service';

import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError('');

            const data =
                await taskService.getTasks();

            console.log(
                'Dashboard tasks response:',
                data
            );

            const taskData =
                extractTaskList(data);

            setTasks(taskData);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                'Unable to load dashboard data.'
            );

            setTasks([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const statistics = useMemo(() => {
        const total = tasks.length;

        const inProgress = tasks.filter(
            (task) =>
                task.status === 'IN_PROGRESS'
        ).length;

        const completed = tasks.filter(
            (task) =>
                task.status === 'COMPLETED'
        ).length;

        const now = new Date();

        const overdue = tasks.filter((task) => {
            if (!task.dueDate) {
                return false;
            }

            if (
                task.status === 'COMPLETED'
            ) {
                return false;
            }

            return (
                new Date(task.dueDate) < now
            );
        }).length;

        return {
            total,
            inProgress,
            completed,
            overdue
        };
    }, [tasks]);

    const progressTotal = tasks.length;

    const progressCompleted =
        statistics.completed;

    const firstName =
        user?.name
            ? user.name.split(' ')[0]
            : 'there';

    return (
        <div className="dashboard-page page-container fade-in">

            <WelcomeHeader
                userName={firstName}
                onAddTask={() =>
                    navigate('/tasks')
                }
            />

            {error && (
                <div className="tasks-error">
                    {error}
                </div>
            )}

            <section className="stats-grid">

                <StatCard
                    type="total"
                    label="Total tasks"
                    value={
                        loading
                            ? '—'
                            : statistics.total
                    }
                    description="All your tasks"
                />

                <StatCard
                    type="progress"
                    label="In progress"
                    value={
                        loading
                            ? '—'
                            : statistics.inProgress
                    }
                    description="Currently being worked on"
                />

                <StatCard
                    type="completed"
                    label="Completed"
                    value={
                        loading
                            ? '—'
                            : statistics.completed
                    }
                    description="Tasks finished"
                />

                <StatCard
                    type="overdue"
                    label="Overdue"
                    value={
                        loading
                            ? '—'
                            : statistics.overdue
                    }
                    description="Need your attention"
                />

            </section>

            {!loading && (
                <section className="dashboard-progress">

                    <ProgressCard
                        completed={
                            progressCompleted
                        }
                        total={progressTotal}
                    />

                </section>
            )}

            <section className="dashboard-main-grid">

                <UpcomingTasks
                    tasks={tasks}
                    onViewAll={() =>
                        navigate('/tasks')
                    }
                />

                <ActivityCard
                    tasks={tasks}
                />

            </section>

        </div>
    );
}

export default Dashboard;