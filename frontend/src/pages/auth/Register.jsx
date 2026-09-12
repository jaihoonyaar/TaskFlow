import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CheckSquare,
    UserPlus,
    ArrowRight
} from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { useAuth } from '../../context/AuthContext';

import './Register.css';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError('Please fill in all fields.');
            return;
        }

        if (form.password.length < 6) {
            setError(
                'Password must be at least 6 characters.'
            );
            return;
        }

        if (
            form.password !== form.confirmPassword
        ) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);

            await register(
                form.name,
                form.email,
                form.password
            );

            navigate('/dashboard', {
                replace: true
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to create your account.'
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
                        <UserPlus size={18} />
                    </div>

                    <h1>Create your account</h1>

                    <p>
                        Start organizing your work with TaskFlow.
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
                        label="Full name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(event) =>
                            handleChange(
                                'name',
                                event.target.value
                            )
                        }
                        autoComplete="name"
                    />

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
                        placeholder="At least 6 characters"
                        value={form.password}
                        onChange={(event) =>
                            handleChange(
                                'password',
                                event.target.value
                            )
                        }
                        autoComplete="new-password"
                    />

                    <Input
                        label="Confirm password"
                        type="password"
                        placeholder="Repeat your password"
                        value={form.confirmPassword}
                        onChange={(event) =>
                            handleChange(
                                'confirmPassword',
                                event.target.value
                            )
                        }
                        autoComplete="new-password"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={loading}
                    >
                        {loading
                            ? 'Creating account...'
                            : 'Create account'}

                        {!loading && (
                            <ArrowRight size={17} />
                        )}
                    </Button>

                </form>

                <div className="auth-footer">
          <span>
            Already have an account?
          </span>

                    <Link to="/login">
                        Sign in
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Register;