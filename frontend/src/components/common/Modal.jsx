import { X } from "lucide-react";
import "./Modal.css";

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   size = "medium",
               }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" onMouseDown={onClose}>
            <div
                className={`modal modal-${size}`}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;