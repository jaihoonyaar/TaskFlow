import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, LockKeyhole } from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { useAuth } from '../../context/AuthContext';

import './Login.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');

        if (!form.email || !form.password) {
            setError('Please enter your email and password.');
            return;
        }

        try {
            setLoading(true);

            await login(form.email, form.password);

            navigate('/dashboard', {
                replace: true
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Invalid email or password.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-glow auth-glow-one" />
            <div className="auth-glow auth-glow-two" />

            <div className="auth-card">

                <div className="auth-brand">
                    <div className="auth-brand-icon">
                        <CheckSquare size={20} />
                    </div>

                    <span>TaskFlow</span>
                </div>

                <div className="auth-heading">
                    <div className="auth-icon">
                        <LockKeyhole size={18} />
                    </div>

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue managing your tasks.
                    </p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(event) =>
                            handleChange(
                                'email',
                                event.target.value
                            )
                        }
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(event) =>
                            handleChange(
                                'password',
                                event.target.value
                            )
                        }
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={loading}
                    >
                        {loading
                            ? 'Signing in...'
                            : 'Sign in'}

                        {!loading && (
                            <ArrowRight size={17} />
                        )}
                    </Button>

                </form>

                <div className="auth-footer">
          <span>
            Don't have an account?
          </span>

                    <Link to="/register">
                        Create one
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Login;