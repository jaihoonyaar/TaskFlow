import {
    CheckSquare,
    CircleDot,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

import './StatCard.css';

const iconMap = {
    total: CheckSquare,
    progress: CircleDot,
    completed: CheckCircle2,
    overdue: AlertCircle
};

function StatCard({
                      type,
                      label,
                      value,
                      description,
                      trend
                  }) {
    const Icon = iconMap[type] || CheckSquare;

    return (
        <div className={`stat-card stat-${type}`}>
            <div className="stat-card-top">
                <div className="stat-icon">
                    <Icon size={18} />
                </div>

                {trend && (
                    <span className="stat-trend">
            {trend}
          </span>
                )}
            </div>

            <div className="stat-value">
                {value}
            </div>

            <div className="stat-label">
                {label}
            </div>

            <div className="stat-description">
                {description}
            </div>
        </div>
    );
}

export default StatCard;