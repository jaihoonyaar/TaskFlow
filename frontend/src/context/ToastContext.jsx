import {
    createContext,
    useCallback,
    useContext,
    useState
} from 'react';

import Toast from '../components/common/Toast';

const ToastContext = createContext(null);

function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback(
        (message, type = 'success') => {
            setToast({
                id: Date.now(),
                message,
                type
            });

            setTimeout(() => {
                setToast(null);
            }, 3000);
        },
        []
    );

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider
            value={{
                showToast,
                hideToast
            }}
        >
            {children}

            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}

export default ToastProvider;