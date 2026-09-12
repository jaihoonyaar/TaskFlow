import {
    ArrowRight,
    CalendarDays
} from 'lucide-react';

import Badge from '../common/Badge';

import './UpcomingTasks.css';

function UpcomingTasks({ tasks = [], onViewAll }) {
    const upcomingTasks = tasks
        .filter(
            (task) => task.status !== 'COMPLETED'
        )
        .sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;

            return (
                new Date(a.dueDate) -
                new Date(b.dueDate)
            );
        })
        .slice(0, 5);

    return (
        <div className="upcoming-card">

            <div className="upcoming-header">

                <div>
                    <h2>Upcoming tasks</h2>

                    <p>
                        What needs your attention next.
                    </p>
                </div>

                <button
                    className="view-all-button"
                    onClick={onViewAll}
                >
                    View all
                    <ArrowRight size={15} />
                </button>

            </div>

            {upcomingTasks.length === 0 ? (
                <div className="dashboard-empty">
                    <p>
                        You're all caught up.
                    </p>

                    <span>
            No upcoming tasks to show.
          </span>
                </div>
            ) : (
                <div className="upcoming-list">

                    {upcomingTasks.map((task) => (

                        <div
                            className="upcoming-task"
                            key={task._id}
                        >

                            <div className="task-check">
                                <span />
                            </div>

                            <div className="upcoming-task-main">

                                <div className="upcoming-task-title">
                                    {task.title}
                                </div>

                                <div className="upcoming-task-meta">

                  <span>
                    {task.category}
                  </span>

                                    <span className="meta-separator">
                    •
                  </span>

                                    <span
                                        className={`priority-${task.priority.toLowerCase()}`}
                                    >
                    {task.priority}
                  </span>

                                </div>

                            </div>

                            {task.dueDate && (
                                <div className="upcoming-task-due">

                                    <CalendarDays size={13} />

                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'short',
                                            day: 'numeric'
                                        }
                                    )}

                                </div>
                            )}

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default UpcomingTasks;