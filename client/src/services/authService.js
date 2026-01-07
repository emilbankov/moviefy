import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

// Mobile detection utility
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
};

// Store auth token for mobile fallback
const MOBILE_AUTH_KEY = 'moviefy_mobile_auth';
const MOBILE_USER_KEY = 'moviefy_mobile_user';

export const register = async (userData) => await post(`${baseUrl}/auth/register`, userData);
export const login = async (userData) => {
    const formData = new URLSearchParams();
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include', // Required for Spring Security session cookies
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formData,
    });

    if (response.status === 204) {
        // Store login success for mobile fallback
        if (isMobile()) {
            localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
        }
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    // Store login success for mobile fallback
    if (isMobile()) {
        localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
    }

    return result;
};
export const logout = async () => {
    try {
        await post(`${baseUrl}/auth/logout`);
    } catch (error) {
        console.warn('Server logout failed:', error);
    } finally {
        // Always clear mobile auth data
        if (isMobile()) {
            localStorage.removeItem(MOBILE_AUTH_KEY);
            localStorage.removeItem(MOBILE_USER_KEY);
        }
    }
};
export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.status === 401) {
            // Clear mobile auth data if server says unauthorized
            if (isMobile()) {
                localStorage.removeItem(MOBILE_AUTH_KEY);
                localStorage.removeItem(MOBILE_USER_KEY);
            }
            return null; // User not authenticated
        }

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        // Cache user data for mobile fallback
        if (isMobile() && userData) {
            localStorage.setItem(MOBILE_USER_KEY, JSON.stringify(userData));
        }

        return userData;
    } catch (error) {
        // Mobile fallback: check if we have cached auth data
        if (isMobile()) {
            const cachedAuth = localStorage.getItem(MOBILE_AUTH_KEY);
            const cachedUser = localStorage.getItem(MOBILE_USER_KEY);

            if (cachedAuth && cachedUser) {
                // Check if auth is still valid (within 24 hours)
                const authTime = parseInt(cachedAuth);
                const now = Date.now();
                const twentyFourHours = 24 * 60 * 60 * 1000;

                if (now - authTime < twentyFourHours) {
                    console.log('Using cached auth data for mobile');
                    return JSON.parse(cachedUser);
                } else {
                    // Clear expired auth
                    localStorage.removeItem(MOBILE_AUTH_KEY);
                    localStorage.removeItem(MOBILE_USER_KEY);
                }
            }
        }

        // If fetch fails (network issues, CORS, etc.), assume not authenticated
        console.warn('Auth check failed:', error);
        return null;
    }
};
export const verifyEmail = async (token) => await post(`${baseUrl}/auth/verify-email`, { token });
export const requestPasswordReset = async (email) => await post(`${baseUrl}/auth/password-reset/request`, { email });
export const checkPasswordResetToken = async (token) => await post(`${baseUrl}/auth/password-reset/token-check`, { token });
export const confirmPasswordReset = async (token, password) => await post(`${baseUrl}/auth/password-reset/confirm`, { token, password });

export const resendVerification = async (token) => await post(`${baseUrl}/auth/resend-email`, { token });
// export const getUser = async () => await get(`${baseUrl}/auth/user`);
// export const updateUser = async (userData) => await put(`${baseUrl}/auth/user`, userData);
// export const deleteUser = async () => await del(`${baseUrl}/auth/user`);
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);
export const getUserProfile = async () => {
    try {
        const response = await fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include', // Required for Spring Security session cookies
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.status === 401) {
            return null; // User not authenticated
        }

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);