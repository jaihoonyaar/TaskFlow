import { CalendarDays, Plus } from 'lucide-react';
import Button from '../common/Button';

import './WelcomeHeader.css';

function WelcomeHeader({ userName,onAddTask }) {
    const today = new Date();

    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    const hour = new Date().getHours();

    let greeting = 'Good evening';

    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    }
    return (
        <div className="welcome-header">
            <div>
                <div className="welcome-eyebrow">
                    <CalendarDays size={15} />
                    <span>{formattedDate}</span>
                </div>


                <h1 className="welcome-title">
                    {greeting}, {userName}
                </h1>

                <p className="welcome-description">
                    Here's an overview of everything you need to get done.
                </p>
            </div>

            <Button
                variant="primary"
                size="medium"
                onClick={onAddTask}
            >
                <Plus size={17} />
                Add Task
            </Button>
        </div>
    );
}

export default WelcomeHeader;