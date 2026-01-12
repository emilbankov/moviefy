import { createContext, useState, useEffect, useContext } from "react";
import { login, register, logout, getCurrentUser, refreshAuthCache } from '../services/authService';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        user: null,
        isLoading: true,
        isAuthenticated: false
    });
    const [authError, setAuthError] = useState(null);

    // Check authentication status on app load
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setAuth({
                        user,
                        isLoading: false,
                        isAuthenticated: true
                    });
                } else {
                    setAuth({
                        user: null,
                        isLoading: false,
                        isAuthenticated: false
                    });
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuth({
                    user: null,
                    isLoading: false,
                    isAuthenticated: false
                });
            }
        };

        checkAuthStatus();
    }, []);

    const loginSubmitHandler = async (values) => {
        setAuthError(null);
        setAuth(prev => ({ ...prev, isLoading: true }));

        try {
            await login(values);

            // Login successful - get user data
            const user = await getCurrentUser();

            setAuth({
                user,
                isLoading: false,
                isAuthenticated: true
            });

            navigate("/");
        } catch (error) {
            setAuth(prev => ({ ...prev, isLoading: false }));

            if (error?.message?.includes('email') || error?.message?.includes('password')) {
                setAuthError("Invalid email or password");
            } else {
                setAuthError(error.message || "Login failed. Please try again.");
            }
            throw error;
        }
    };

    const registerSubmitHandler = async (values) => {
        setAuthError(null);
        try {
            const result = await register(values);

            // Registration successful - show message but don't auto-login
            setAuthError(null);

            // Navigate to login page or show success message
            navigate("/login-register");

        } catch (error) {
            if (error?.message?.includes('email') || error?.message?.includes('Email')) {
                setAuthError('Account with this email already exists');
            } else {
                setAuthError(error.message || 'Registration failed. Please try again.');
            }
            throw error;
        }
    };

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }

        setAuth({
            user: null,
            isLoading: false,
            isAuthenticated: false
        });

        navigate("/");
    };

    const refreshAuthHandler = async () => {
        try {
            console.log('Manually refreshing auth...');
            const user = await refreshAuthCache();
            if (user) {
                setAuth({
                    user,
                    isLoading: false,
                    isAuthenticated: true
                });
                console.log('Auth refreshed successfully');
            } else {
                setAuth({
                    user: null,
                    isLoading: false,
                    isAuthenticated: false
                });
                console.log('Auth refresh failed - no valid session');
            }
        } catch (error) {
            console.error('Auth refresh error:', error);
            setAuth({
                user: null,
                isLoading: false,
                isAuthenticated: false
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            loginSubmitHandler,
            registerSubmitHandler,
            logoutHandler,
            refreshAuthHandler,
            user: auth.user,
            isAuthenticated: auth.isAuthenticated,
            isLoading: auth.isLoading,
            authError,
            clearAuthError: () => setAuthError(null)
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
