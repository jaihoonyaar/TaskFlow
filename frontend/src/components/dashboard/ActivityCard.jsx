import {
    PlusCircle,
    CalendarDays
} from 'lucide-react';

import './ActivityCard.css';

function ActivityCard({ tasks = [] }) {
    const recentTasks = [...tasks]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    return (
        <div className="activity-card">

            <div className="activity-header">
                <h2>Recently added</h2>

                <span>
          Latest
        </span>
            </div>

            {recentTasks.length === 0 ? (
                <div className="dashboard-empty">
                    <p>No tasks yet.</p>

                    <span>
            Create your first task to get started.
          </span>
                </div>
            ) : (
                <div className="activity-list">

                    {recentTasks.map((task) => (

                        <div
                            className="activity-item"
                            key={task._id}
                        >

                            <div className="activity-icon primary">
                                <PlusCircle size={15} />
                            </div>

                            <div className="activity-content">

                                <p>
                                    {task.title}
                                </p>

                                <span>
                  {task.createdAt
                      ? new Date(
                          task.createdAt
                      ).toLocaleDateString(
                          'en-US',
                          {
                              month: 'short',
                              day: 'numeric'
                          }
                      )
                      : 'Recently added'}
                </span>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default ActivityCard;