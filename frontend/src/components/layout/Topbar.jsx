

import {
    Menu,
    Search,
    Bell,
    LogOut,
    User,
    ChevronDown
} from 'lucide-react';
import {
    useEffect,
    useRef,
    useState
} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import NotificationCenter from './NotificationCenter/NotificationCenter';

function Topbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const profileRef =
        useRef(null);
    const [profileOpen, setProfileOpen] =
        useState(false);
    const navigate = useNavigate();
    const firstLetter =
        user?.name?.charAt(0)?.toUpperCase() || 'U';

    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="topbar">

            <div className="topbar-left">

                <button
                    className="mobile-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    <Menu size={21} />
                </button>

                <div className="topbar-search">
                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        aria-label="Search tasks"
                        onFocus={() =>
                            navigate('/tasks')
                        }
                    />

                    <span className="search-shortcut">
            Ctrl K
          </span>
                </div>

            </div>

            <div className="topbar-actions">

                <NotificationCenter />

                <div className="topbar-divider" />



                <div className="profile-wrapper"
                ref={profileRef}>

                    <button
                        className="topbar-profile"
                        onClick={() =>
                            setProfileOpen(
                                (current) => !current
                            )
                        }
                        aria-expanded={profileOpen}
                    >
                        <div className="topbar-avatar">
                            {firstLetter}
                        </div>

                        <span className="topbar-profile-name">
              {user?.name || 'User'}
            </span>

                        <ChevronDown
                            size={14}
                            className={
                                profileOpen
                                    ? 'profile-chevron-open'
                                    : ''
                            }
                        />
                    </button>

                    {profileOpen && (
                        <div className="profile-menu">

                            <div className="profile-menu-user">

                                <div className="profile-menu-avatar">
                                    {firstLetter}
                                </div>

                                <div>
                                    <strong>
                                        {user?.name || 'User'}
                                    </strong>

                                    <span>
                    {user?.email || ''}
                  </span>
                                </div>

                            </div>

                            <div className="profile-menu-divider" />

                            <button
                                className="profile-menu-item"
                                onClick={logout}
                            >
                                <LogOut size={15} />
                                Sign out
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Topbar;