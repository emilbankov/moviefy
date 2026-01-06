import { useState, useEffect, useContext } from 'react';
import { register, requestPasswordReset } from '../../services/authService';
import AuthContext from '../../contexts/AuthProvider';

export default function LoginRegister() {
    const { loginSubmitHandler, registerSubmitHandler, isLoading: authLoading, authError } = useContext(AuthContext);

    const [registerForm, setRegisterForm] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: ''
    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    // Auto-clear notifications after 3 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    // Clear forms when switching tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError('');
        setSuccess('');
        setShowForgotPassword(false);
        setForgotPasswordEmail('');

        // Clear the inactive form
        if (tab === 'login') {
            setRegisterForm({
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                confirm_password: ''
            });
        } else {
            setLoginForm({
                email: '',
                password: ''
            });
        }
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate password match
        if (registerForm.password !== registerForm.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        // Validate required fields
        if (!registerForm.email || !registerForm.first_name ||
            !registerForm.last_name || !registerForm.password) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            // Create userData object with only the fields needed for the API
            const userData = {
                email: registerForm.email,
                first_name: registerForm.first_name,
                last_name: registerForm.last_name,
                password: registerForm.password
            };

            await registerSubmitHandler(userData);
            setSuccess('Registration successful! Please check your email to verify your account.');
            // Reset form
            setRegisterForm({
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                confirm_password: ''
            });
        } catch (error) {
            // Error is handled by AuthProvider
            setError(authError || 'Registration failed. Please try again.');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate required fields
        if (!loginForm.email || !loginForm.password) {
            setError('Please enter both email and password');
            return;
        }

        try {
            await loginSubmitHandler({
                email: loginForm.email,
                password: loginForm.password
            });

            // Reset form on success (navigation will happen automatically)
            setLoginForm({
                email: '',
                password: ''
            });
        } catch (error) {
            // Error is handled by AuthProvider
            setError(authError || 'Login failed. Please try again.');
        }
    };

    const handleForgotPassword = () => {
        setError('');
        setSuccess('');
        setShowForgotPassword(true);
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate email is entered
        if (!forgotPasswordEmail.trim()) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await requestPasswordReset(forgotPasswordEmail);
            setSuccess(response.message || 'Password reset email sent! Please check your inbox.');
            setShowForgotPassword(false);
            setForgotPasswordEmail('');
        } catch (err) {
            setError(err.message || 'Failed to send password reset email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-lg-9 col-xxl-7">
                            <div className={`bg-dark login-tabs tabs ${showForgotPassword ? 'd-none' : ''}`}>
                                <ul
                                    className="nav nav-tabs justify-content-center"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                            id="login-tab"
                                            data-bs-toggle="tab"
                                            href="#login"
                                            role="tab"
                                            aria-controls="login"
                                            aria-selected={activeTab === 'login'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleTabChange('login');
                                            }}
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                                            id="register-tab"
                                            data-bs-toggle="tab"
                                            href="#register"
                                            role="tab"
                                            aria-controls="register"
                                            aria-selected={activeTab === 'register'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleTabChange('register');
                                            }}
                                        >
                                            Register
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-dark">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                                        id="login"
                                        role="tabpanel"
                                        aria-labelledby="login-tab"
                                    >
                                        {error && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="alert alert-success mt-3" role="alert">
                                                {success}
                                            </div>
                                        )}
                                        {showForgotPassword ? (
                                            <form onSubmit={handleForgotPasswordSubmit} className="row mt-4 mb-4 mb-sm-5 align-items-center form-flat-style">
                                                <div className="mb-3 col-sm-12">
                                                    <label className="form-label">Email:</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={forgotPasswordEmail}
                                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">
                                                    <ul className="list-unstyled d-flex justify-content-sm-end mb-0 mt-md-0 mt-3">
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="btn btn-link p-0 text-decoration-none"
                                                                onClick={() => {
                                                                    setShowForgotPassword(false);
                                                                    setForgotPasswordEmail('');
                                                                    setError('');
                                                                }}
                                                            >
                                                                Back to Login
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </form>
                                        ) : (
                                            <form onSubmit={handleLoginSubmit} className="row mt-4 mb-4 mb-sm-5 align-items-center form-flat-style">
                                                <div className="mb-3 col-sm-12">
                                                    <label className="form-label">Email:</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={loginForm.email}
                                                        onChange={handleLoginChange}
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3 col-sm-12">
                                                    <label className="form-label">Password:</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={loginForm.password}
                                                        onChange={handleLoginChange}
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                    />
                                                    <div className="mt-2 text-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0 text-decoration-none"
                                                            onClick={handleForgotPassword}
                                                            disabled={isLoading}
                                                            style={{ fontSize: '0.875rem' }}
                                                        >
                                                            Forgot Password?
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                                        {isLoading ? 'Logging in...' : 'Login'}
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">
                                                    <ul className="list-unstyled d-flex justify-content-sm-end mb-0 mt-md-0 mt-3">
                                                        <li>
                                                            Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); handleTabChange('register'); }}>Click here</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </form>
                                        )}
                                        <div className="login-social-media bg-secondary">
                                            <div className="mb-4 d-block text-center">
                                                <b>Login or Sign in with</b>
                                            </div>
                                            <form className="row">
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark facebook-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-facebook-f me-2" />
                                                            Login with Facebook
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark twitter-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-twitter me-2" />
                                                            Login with Twitter
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark instagram-bg social-bg-hover d-block mb-3 mb-md-0"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-instagram me-2" />
                                                            Login with Instagram
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark linkedin-bg social-bg-hover d-block"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-linkedin-in me-2" />
                                                            Login with Linkedin
                                                        </span>
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}
                                        id="register"
                                        role="tabpanel"
                                        aria-labelledby="register-tab"
                                    >
                                        {error && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="alert alert-success mt-3" role="alert">
                                                {success}
                                            </div>
                                        )}
                                        <form onSubmit={handleRegisterSubmit} className="row mt-4 mb-4 mb-sm-5 align-items-center form-flat-style">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Email Address:</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={registerForm.email}
                                                    onChange={handleRegisterChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Firstname:</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={registerForm.first_name}
                                                    onChange={handleRegisterChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Lastname:</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={registerForm.last_name}
                                                    onChange={handleRegisterChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Password:</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={registerForm.password}
                                                    onChange={handleRegisterChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Confirm Password:</label>
                                                <input
                                                    type="password"
                                                    name="confirm_password"
                                                    value={registerForm.confirm_password}
                                                    onChange={handleRegisterChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheck02"
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheck02">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <ul className="list-unstyled d-flex justify-content-md-end mb-0">
                                                    <li>
                                                        Already Registered User?{" "}
                                                        <a href="#login" onClick={(e) => { e.preventDefault(); handleTabChange('login'); }}>Click here to login</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                                    {isLoading ? 'Registering...' : 'Register'}
                                                </button>
                                            </div>
                                        </form>
                                        <div className="login-social-media bg-secondary">
                                            <div className="mb-4 d-block text-center">
                                                <b>Login or Sign in with</b>
                                            </div>
                                            <form className="row">
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark facebook-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-facebook-f me-2" />
                                                            Login with Facebook
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark twitter-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-twitter me-2" />
                                                            Login with Twitter
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark instagram-bg social-bg-hover d-block mb-3 mb-md-0"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-instagram me-2" />
                                                            Login with Instagram
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark linkedin-bg social-bg-hover d-block"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-linkedin-in me-2" />
                                                            Login with Linkedin
                                                        </span>
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}