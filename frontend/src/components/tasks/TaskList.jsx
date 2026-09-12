import TaskCard from './TaskCard';

import './TaskList.css';

function TaskList({
                      tasks,
                      loading,
                      onComplete,
                      onEdit,
                      onDelete
                  }) {
    if (loading) {
        return (
            <div className="task-list">
                {[1, 2, 3].map((item) => (
                    <div
                        className="task-skeleton"
                        key={item}
                    >
                        <div className="skeleton-circle" />

                        <div className="skeleton-content">
                            <div className="skeleton-title" />
                            <div className="skeleton-meta" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!tasks.length) {
        return (
            <div className="task-empty-state">
                <div className="empty-icon">
                    ✓
                </div>

                <h3>
                    No tasks found
                </h3>

                <p>
                    Try changing your filters or create a new task.
                </p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;