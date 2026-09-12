import {
    CheckCircle2,
    AlertCircle,
    Info,
    X
} from 'lucide-react';

import './Toast.css';

function Toast({
                   message,
                   type = 'success',
                   onClose
               }) {
    const Icon =
        type === 'error'
            ? AlertCircle
            : type === 'info'
                ? Info
                : CheckCircle2;

    return (
        <div className={`toast toast-${type}`}>

            <Icon
                className="toast-icon"
                size={17}
            />

            <span className="toast-message">
        {message}
      </span>

            <button
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                <X size={15} />
            </button>

        </div>
    );
}

export default Toast;