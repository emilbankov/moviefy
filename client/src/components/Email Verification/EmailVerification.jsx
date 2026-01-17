import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerification } from '../../services/authService';
import MetaTags from '../Meta Tags/MetaTags';

export default function EmailVerification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(15 * 60); // 15 minutes in seconds
    const [isResending, setIsResending] = useState(false);

    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            handleVerification();
        } else {
            setIsVerifying(false);
            setError('No verification token found in URL');
        }
    }, [token]);

    useEffect(() => {
        let interval;
        if (!canResend && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [canResend, resendTimer]);

    const handleVerification = async () => {
        try {
            setIsVerifying(true);
            setError('');
            const response = await verifyEmail(token);
            setIsVerified(true);
        } catch (err) {
            console.log('Full error object:', err);
            console.log('Error message:', err.message);
            console.log('Error response:', err.response);
            const errorMessage = err.message || 'Verification failed. The link may be expired or invalid.';
            setError(errorMessage);
            // If verification fails due to expired token, enable resend
            if (errorMessage?.includes('expired') || errorMessage?.includes('15 minutes')) {
                setCanResend(true);
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendVerification = async () => {
        if (!token) {
            setError('No verification token available for resend.');
            return;
        }

        try {
            setIsResending(true);
            setError('');
            await resendVerification(token);
            // Reset timer after successful resend
            setCanResend(false);
            setResendTimer(15 * 60);
            // Show success message
            setError('Verification email sent successfully! Please check your inbox.');
        } catch (err) {
            const errorMessage = err.message || 'Failed to resend verification email.';
            setError(errorMessage);
        } finally {
            setIsResending(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <MetaTags
                title="Moviefy | Потвърждение на имейл"
                description="Потвърдете вашия имейл адрес в Moviefy, за да активирате вашия акаунт и да получите пълен достъп до всички функции."
                keywords="потвърждение на имейл, верификация, активация на акаунт, Moviefy, имейл потвърждение"
            />
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">Email Verification</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-lg-6 col-xxl-5">
                            <div className="bg-dark text-center p-5 rounded">
                                {isVerifying ? (
                                    <div>
                                        <div className="spinner-border text-primary mb-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <h3 className="text-white mb-3">Verifying your email...</h3>
                                        <p className="text-muted">Please wait while we verify your account.</p>
                                    </div>
                                ) : isVerified ? (
                                    <div>
                                        <div className="text-success mb-4">
                                            <i className="fas fa-check-circle fa-4x"></i>
                                        </div>
                                        <h3 className="text-white mb-3">Email Verified Successfully!</h3>
                                        <p className="text-muted mb-4">
                                            Your account has been verified. You can now enjoy all features of Moviefy.
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate('/login-register')}
                                        >
                                            Go to Login
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-danger mb-4">
                                            <i className="fas fa-times-circle fa-4x"></i>
                                        </div>
                                        <h3 className="text-white mb-3">Verification Failed</h3>
                                        <p className="text-muted mb-4">{error}</p>

                                        {canResend ? (
                                            <div>
                                                <button
                                                    className="btn btn-primary mb-3"
                                                    onClick={handleResendVerification}
                                                    disabled={isResending}
                                                >
                                                    {isResending ? 'Sending...' : 'Resend Verification Email'}
                                                </button>
                                                <p className="text-muted small">
                                                    Didn't receive the email? Click above to resend.
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-muted mb-3">
                                                    You can request a new verification email in: {formatTime(resendTimer)}
                                                </p>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => navigate('/login-register')}
                                                >
                                                    Back to Login
                                                </button>
                                            </div>
                                        )}
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
