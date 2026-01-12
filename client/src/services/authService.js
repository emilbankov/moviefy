import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

// Mobile detection utility
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

// Force refresh auth cache from server (useful for mobile debugging)
export const refreshAuthCache = async () => {
    try {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            if (userData) {
                if (isMobile()) {
                    localStorage.setItem(MOBILE_USER_KEY, JSON.stringify(userData));
                    localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
                }
                return userData;
            }
        }
    } catch (error) {
        console.warn('Failed to refresh auth cache:', error);
    }
    return null;
};
export const getCurrentUser = async () => {
    // On mobile, first check cache to avoid unnecessary network requests
    if (isMobile()) {
        const cachedAuth = localStorage.getItem(MOBILE_AUTH_KEY);
        const cachedUser = localStorage.getItem(MOBILE_USER_KEY);

        if (cachedAuth && cachedUser) {
            const authTime = parseInt(cachedAuth);
            const now = Date.now();
            const sevenDays = 7 * 24 * 60 * 60 * 1000;

            if (now - authTime < sevenDays) {
                // Use cached data first on mobile
                return JSON.parse(cachedUser);
            } else {
                // Clear expired auth
                localStorage.removeItem(MOBILE_AUTH_KEY);
                localStorage.removeItem(MOBILE_USER_KEY);
            }
        }
    }

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
            localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
        }

        return userData;
    } catch (error) {
        console.warn('Auth check failed:', error);

        // Mobile fallback: if server request fails, try cache again
        if (isMobile()) {
            const cachedAuth = localStorage.getItem(MOBILE_AUTH_KEY);
            const cachedUser = localStorage.getItem(MOBILE_USER_KEY);

            if (cachedAuth && cachedUser) {
                const authTime = parseInt(cachedAuth);
                const now = Date.now();
                const sevenDays = 7 * 24 * 60 * 60 * 1000;

                if (now - authTime < sevenDays) {
                    console.log('Using cached auth data as fallback');
                    return JSON.parse(cachedUser);
                } else {
                    // Clear expired auth
                    localStorage.removeItem(MOBILE_AUTH_KEY);
                    localStorage.removeItem(MOBILE_USER_KEY);
                }
            }
        }

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
    // Use the same endpoint as getCurrentUser for consistency
    // This avoids mobile cookie issues with different endpoints
    return await getCurrentUser();
};
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);