import {
    User,
    Shield,
    LogOut
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import Button from '../components/common/Button';

import './Settings.css';

function Settings() {
    const {
        user,
        logout
    } = useAuth();

    return (
        <div className="settings-page page-container fade-in">

            <div className="settings-header">
                <h1 className="section-title">
                    Settings
                </h1>

                <p className="section-description">
                    Manage your account and application preferences.
                </p>
            </div>

            <div className="settings-section">

                <div className="settings-section-header">

                    <div className="settings-section-icon">
                        <User size={17} />
                    </div>

                    <div>
                        <h2>
                            Profile
                        </h2>

                        <p>
                            Your TaskFlow account information.
                        </p>
                    </div>

                </div>

                <div className="settings-profile">

                    <div className="settings-avatar">
                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || 'U'}
                    </div>

                    <div className="settings-profile-info">

            <span className="settings-name">
              {user?.name || 'User'}
            </span>

                        <span className="settings-email">
              {user?.email || ''}
            </span>

                    </div>

                </div>

            </div>

            <div className="settings-section">

                <div className="settings-section-header">

                    <div className="settings-section-icon">
                        <Shield size={17} />
                    </div>

                    <div>
                        <h2>
                            Security
                        </h2>

                        <p>
                            Your account is protected by JWT authentication.
                        </p>
                    </div>

                </div>

                <div className="security-status">
                    <span className="security-dot" />

                    Authentication active
                </div>

            </div>

            <div className="settings-section danger-section">

                <div className="settings-section-header">

                    <div className="settings-section-icon danger-icon">
                        <LogOut size={17} />
                    </div>

                    <div>
                        <h2>
                            Session
                        </h2>

                        <p>
                            Sign out from this TaskFlow session.
                        </p>
                    </div>

                </div>

                <Button
                    variant="danger"
                    onClick={logout}
                >
                    <LogOut size={15} />
                    Sign out
                </Button>

            </div>

        </div>
    );
}

export default Settings;