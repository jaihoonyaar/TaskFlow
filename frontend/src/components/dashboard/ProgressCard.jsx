import { Target } from 'lucide-react';

import './ProgressCard.css';

function ProgressCard({
                          completed = {statistics:completed},
                          total = {tasks:length}
                      }) {
    const percentage = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    return (
        <div className="progress-card">
            <div className="progress-card-header">
                <div>
                    <div className="card-eyebrow">
                        <Target size={15} />
                        Today's progress
                    </div>

                    <h2>
                        Keep the momentum going
                    </h2>
                </div>

                <div className="progress-percentage">
                    {percentage}%
                </div>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="progress-footer">
        <span>
          {completed} of {total} tasks completed
        </span>

                <span>
          {total - completed} remaining
        </span>
            </div>
        </div>
    );
}

export default ProgressCard;