import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Completed from '../pages/Completed';
import Settings from '../pages/Settings';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public routes */}
                <Route element={<PublicRoute />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Route>

                {/* Protected application */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<AppLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/tasks"
                            element={<Tasks />}
                        />

                        <Route
                            path="/completed"
                            element={<Completed />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />

                    </Route>

                </Route>

                {/* Default */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                {/* Unknown route */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;