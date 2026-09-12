import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    Clock3,
    Settings,
    X,
    Sparkles
} from 'lucide-react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navigationItems = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard
    },
    {
        label: 'Tasks',
        path: '/tasks',
        icon: CheckSquare
    },
    {
        label: 'Completed',
        path: '/completed',
        icon: Clock3
    }
];

function Sidebar({ mobileOpen, onClose }) {
    const { user, logout } = useAuth();
    return (
        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
                <div className="brand">
                    <div className="brand-icon">
                        <Sparkles size={18} />
                    </div>

                    <span className="brand-name">TaskFlow</span>
                </div>

                <button
                    className="sidebar-close"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="sidebar-content">
                <div className="nav-section">
                    <p className="nav-label">Workspace</p>

                    <nav className="sidebar-nav">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div className="nav-section sidebar-bottom">
                    <p className="nav-label">System</p>

                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <Settings size={19} />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>

            <div className="sidebar-footer">

                <Link
                    to="/settings"
                    onClick={onClose}
                    className="sidebar-user-placeholder"
                >
                    <div className="user-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <div className="user-preview">

      <span className="user-name">
        {user?.name || 'User'}
      </span>

                        <span className="user-role">
        {user?.email || 'Personal workspace'}
      </span>

                    </div>
                </Link>

            </div>
        </aside>
    );
}

export default Sidebar;