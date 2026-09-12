import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import authService from '../services/auth.service';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const response = await authService.login(
            email,
            password
        );

        const data =
            response.data || response;

        const token =
            data.token ||
            data.accessToken;

        const loggedInUser =
            data.user ||
            data.data?.user;

        if (!token) {
            throw new Error(
                'Authentication token was not returned.'
            );
        }

        localStorage.setItem(
            'taskflow_token',
            token
        );

        setUser(loggedInUser || null);

        return data;
    };

    const register = async (
        name,
        email,
        password
    ) => {
        const response =
            await authService.register(
                name,
                email,
                password
            );

        const data =
            response.data || response;

        const token =
            data.token ||
            data.accessToken;

        const registeredUser =
            data.user ||
            data.data?.user;

        if (!token) {
            throw new Error(
                'Authentication token was not returned.'
            );
        }

        localStorage.setItem(
            'taskflow_token',
            token
        );

        setUser(registeredUser || null);

        return data;
    };

    const logout = () => {
        localStorage.removeItem(
            'taskflow_token'
        );

        setUser(null);
    };

    useEffect(() => {
        const restoreSession = async () => {
            const token =
                localStorage.getItem(
                    'taskflow_token'
                );

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response =
                    await authService.getMe();

                const data =
                    response.data || response;

                setUser(
                    data.user ||
                    data.data?.user ||
                    data
                );
            } catch (error) {
                console.error(
                    'Session restoration failed:',
                    error
                );

                localStorage.removeItem(
                    'taskflow_token'
                );

                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
}

export default AuthProvider;