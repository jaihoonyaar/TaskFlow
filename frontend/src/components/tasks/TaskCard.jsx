

import {
    CalendarDays,
    MoreHorizontal,
    Pencil,
    Trash2,
    Check,
    Circle
} from 'lucide-react';
import {
    useEffect,
    useRef,
    useState
} from 'react';
import Badge from '../common/Badge';

import './TaskCard.css';

function TaskCard({
                      task,
                      onComplete,
                      onEdit,
                      onDelete
                  }) {
    const [menuOpen, setMenuOpen] =
        useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (
            event
        ) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleOutsideClick
            );
        };
    }, []);
    const isCompleted =
        task.status === 'COMPLETED';

    const isOverdue =
        task.dueDate &&
        !isCompleted &&
        new Date(task.dueDate) < new Date();


    const formattedDate = task.dueDate
        ? new Date(
            task.dueDate
        ).toLocaleDateString(
            'en-US',
            {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }
        )
        : null;

    const handleEdit = () => {
        setMenuOpen(false);
        onEdit(task);
    };

    const handleDelete = () => {
        setMenuOpen(false);
        onDelete(task);
    };

    return (
        <article
            className={`task-card ${
                isCompleted
                    ? 'task-completed'
                    : ''
            }`}
        >

            <button
                className="task-complete-button"
                onClick={() =>
                    onComplete(task)
                }
                aria-label={
                    isCompleted
                        ? 'Mark task incomplete'
                        : 'Complete task'
                }
            >
                {isCompleted ? (
                    <Check size={14} />
                ) : (
                    <Circle size={18} />
                )}
            </button>

            <div className="task-card-content">

                <div className="task-card-title-row">

                    <h3>
                        {task.title}
                    </h3>

                    <div className="task-card-menu" ref={menuRef}>

                        <button
                            className="task-menu-button"
                            onClick={() =>
                                setMenuOpen(
                                    (current) => !current
                                )
                            }
                            aria-label="Task actions"
                            aria-expanded={menuOpen}
                        >
                            <MoreHorizontal size={18} />
                        </button>

                        {menuOpen && (
                            <div className="task-menu">

                                <button
                                    onClick={handleEdit}
                                >
                                    <Pencil size={14} />
                                    Edit
                                </button>

                                <button
                                    className="delete-action"
                                    onClick={handleDelete}
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>

                            </div>
                        )}

                    </div>

                </div>

                {task.description && (
                    <p className="task-description">
                        {task.description}
                    </p>
                )}

                <div className="task-card-meta">
                    <span
                        className={`task-status status-${task.status.toLowerCase()}`}
                    >
  {task.status === 'IN_PROGRESS'
      ? 'In progress'
      : task.status === 'COMPLETED'
          ? 'Completed'
          : 'To do'}
</span>

                    <Badge
                        variant={
                            task.priority === 'HIGH'
                                ? 'danger'
                                : task.priority === 'MEDIUM'
                                    ? 'warning'
                                    : 'success'
                        }
                    >
                        {task.priority}
                    </Badge>

                    <span className="task-category">
            {task.category}
          </span>

                    {formattedDate && (
                        <span
                            className={`task-due-date ${
                                isOverdue
                                    ? 'task-overdue'
                                    : ''
                            }`}
                        >
              <CalendarDays size={13} />
                            {formattedDate}
            </span>
                    )}

                </div>

            </div>

        </article>
    );
}

export default TaskCard;