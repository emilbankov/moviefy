import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { checkPasswordResetToken, confirmPasswordReset } from '../../services/authService';
import MetaTags from '../Meta Tags/MetaTags';

export default function PasswordReset() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [redirectCountdown, setRedirectCountdown] = useState(3);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            handleTokenCheck();
        } else {
            setIsCheckingToken(false);
            setError('No reset token found in URL');
        }
    }, [token]);

    useEffect(() => {
        let interval;
        if (isRedirecting && redirectCountdown > 0) {
            interval = setInterval(() => {
                setRedirectCountdown(prev => {
                    if (prev <= 1) {
                        navigate('/login-register');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRedirecting, redirectCountdown, navigate]);

    const handleTokenCheck = async () => {
        try {
            setIsCheckingToken(true);
            setError('');
            await checkPasswordResetToken(token);
            setIsTokenValid(true);
        } catch (err) {
            setError(err.message || 'The reset link is invalid or has expired.');
        } finally {
            setIsCheckingToken(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await confirmPasswordReset(token, formData.password);
            setSuccess(response.message || 'Password reset successfully! You can now log in with your new password.');
            // Reset form
            setFormData({
                password: '',
                confirmPassword: ''
            });
            // Start redirect countdown
            setIsRedirecting(true);
        } catch (err) {
            setError(err.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MetaTags
                title="Moviefy | Възстановяване на парола"
                description="Възстановете вашата парола в Moviefy. Въведете нова парола, за да възстановите достъпа до вашия акаунт."
                keywords="възстановяване на парола, забравена парола, нова парола, Moviefy, reset password"
            />
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">Reset Password</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-lg-6 col-xxl-5">
                            <div className="bg-dark p-5 rounded">
                                {isCheckingToken ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary mb-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <h3 className="text-white mb-3">Validating reset link...</h3>
                                        <p className="text-muted">Please wait while we verify your reset link.</p>
                                    </div>
                                ) : isTokenValid ? (
                                    isRedirecting ? (
                                        <div className="text-center">
                                            <div style={{ margin: '40px 0', display: 'flex', justifyContent: 'center' }}>
                                                <div className="loader" style={{ margin: '0' }}>
                                                    <div className="loader__container">
                                                        <div className="loader__film">
                                                            <img className="loader__film-img" src="/images/camera loader/film.png" alt="" />
                                                            <img className="loader__film-img" src="/images/camera loader/film.png" alt="" />
                                                        </div>
                                                        <img className="loader__camera" src="/images/camera loader/camera.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="text-white mb-2">Redirecting to Login...</h4>
                                            <p className="text-muted">You will be redirected in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}.</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="text-white text-center mb-4">Enter New Password</h3>

                                            {error && (
                                                <div className="alert alert-danger mb-3" role="alert">
                                                    {error}
                                                </div>
                                            )}

                                            {success && (
                                                <div className="alert alert-success mb-3" role="alert">
                                                    {success}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit} className="row">
                                                <div className="mb-3 col-sm-12">
                                                    <label className="form-label text-white">New Password:</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Enter your new password"
                                                        required
                                                        disabled={isLoading || !!success}
                                                    />
                                                </div>
                                                <div className="mb-3 col-sm-12">
                                                    <label className="form-label text-white">Confirm New Password:</label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Confirm your new password"
                                                        required
                                                        disabled={isLoading || !!success}
                                                    />
                                                </div>
                                                <div className="col-sm-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary w-100"
                                                        disabled={isLoading || !!success}
                                                    >
                                                        {isLoading ? 'Resetting Password...' : 'Reset Password'}
                                                    </button>
                                                </div>
                                            </form>

                                            {!success && (
                                                <div className="text-center mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link text-decoration-none"
                                                        onClick={() => navigate('/login-register')}
                                                    >
                                                        Back to Login
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center">
                                        <div className="text-danger mb-4">
                                            <i className="fas fa-times-circle fa-4x"></i>
                                        </div>
                                        <h3 className="text-white mb-3">Invalid Reset Link</h3>
                                        <p className="text-muted mb-4">{error}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate('/login-register')}
                                        >
                                            Back to Login
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
