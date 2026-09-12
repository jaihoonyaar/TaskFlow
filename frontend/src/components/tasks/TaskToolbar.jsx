import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    X
} from 'lucide-react';

import './TaskToolbar.css';

function TaskToolbar({
                         search,
                         setSearch,
                         status,
                         setStatus,
                         priority,
                         setPriority,
                         category,
                         setCategory,
                         sort,
                         setSort
                     }) {
    const hasFilters =
        search ||
        status !== 'ALL' ||
        priority !== 'ALL' ||
        category !== 'ALL';

    const clearFilters = () => {
        setSearch('');
        setStatus('ALL');
        setPriority('ALL');
        setCategory('ALL');
    };

    return (
        <div className="task-toolbar">

            <div className="task-search">
                <Search size={17} />

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                {search && (
                    <button
                        onClick={() => setSearch('')}
                        aria-label="Clear search"
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            <div className="task-filters">

                <div className="filter-wrapper">
                    <SlidersHorizontal size={15} />

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                    >
                        <option value="ALL">All status</option>
                        <option value="TODO">To do</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                <div className="filter-wrapper">
                    <select
                        value={priority}
                        onChange={(event) =>
                            setPriority(event.target.value)
                        }
                    >
                        <option value="ALL">All priority</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>

                <div className="filter-wrapper">
                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                    >
                        <option value="ALL">All categories</option>
                        <option value="WORK">Work</option>
                        <option value="PERSONAL">Personal</option>
                        <option value="STUDY">Study</option>
                        <option value="PROJECT">Project</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <div className="filter-wrapper">
                    <ArrowUpDown size={15} />

                    <select
                        value={sort}
                        onChange={(event) =>
                            setSort(event.target.value)
                        }
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="dueSoon">Due soon</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>

                {hasFilters && (
                    <button
                        className="clear-filters"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>
                )}

            </div>

        </div>
    );
}

export default TaskToolbar;