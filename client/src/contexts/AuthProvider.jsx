// Commented out due to backend issues - will be uncommented when backend is fixed
/*
import { createContext, useState, useEffect, useContext } from "react";
import { login, register } from '../services/authService';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;

        if (accessToken) {
            return {
                accessToken,
                userProfile
            };
        }

        return {};
    });
    const [authError, setAuthError] = useState(null);

    const updateUserProfile = (profileData) => {
        setAuth(state => ({
            ...state,
            userProfile: profileData
        }));
        localStorage.setItem('userProfile', JSON.stringify(profileData));
    };

    const loginSubmitHandler = async (values) => {
        setAuthError(null);
        try {
            const result = await login(values);

            setAuth({
                accessToken: result.accessToken || result.token,
                userProfile: null
            });

            localStorage.setItem('accessToken', result.accessToken || result.token);

            navigate("/");
        } catch (error) {
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

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile');
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{
            loginSubmitHandler,
            registerSubmitHandler,
            logoutHandler,
            email: auth.email,
            isAuthenticated: !!auth.accessToken,
            userProfile: auth.userProfile,
            authError,
            clearAuthError: () => setAuthError(null),
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
*/
