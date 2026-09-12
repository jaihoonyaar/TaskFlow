import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useReminderScheduler
    from '../../hooks/useReminderScheduler';
import './AppLayout.css';

function AppLayout() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setMobileSidebarOpen(false);
    };

    return (
        <div className="app-layout">
            <Sidebar
                mobileOpen={mobileSidebarOpen}
                onClose={closeSidebar}
            />
            {mobileSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() =>
                        setMobileSidebarOpen(false)
                    }
                />
            )}

            {mobileSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            <Topbar
                onMenuClick={() => setMobileSidebarOpen(true)}
            />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;