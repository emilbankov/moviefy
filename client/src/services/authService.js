import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

// Mobile detection utility
const isMobile = () => {
    // Check user agent for mobile devices
    const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Also check if it's a touch device (covers more cases)
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Don't rely on screen width alone as tablets might be > 768px
    return mobileUA || (touchDevice && window.innerWidth <= 1024);
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
        const loginTime = Date.now().toString();
        localStorage.setItem(MOBILE_AUTH_KEY, loginTime);
        console.log('Login successful, cached auth time:', loginTime);
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    // Store login success for mobile fallback
    const loginTime = Date.now().toString();
    localStorage.setItem(MOBILE_AUTH_KEY, loginTime);
    console.log('Login successful with response, cached auth time:', loginTime);

    return result;
};
export const logout = async () => {
    try {
        await post(`${baseUrl}/auth/logout`);
    } catch (error) {
        console.warn('Server logout failed:', error);
    } finally {
        // Always clear mobile auth data
        localStorage.removeItem(MOBILE_AUTH_KEY);
        localStorage.removeItem(MOBILE_USER_KEY);
        localStorage.removeItem('csrf_token');
        console.log('Cleared all auth cache on logout');
    }
};

// Force refresh auth cache from server (useful for mobile debugging)
export const refreshAuthCache = async () => {
    try {
        console.log('Force refreshing auth cache...');
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
                localStorage.setItem(MOBILE_USER_KEY, JSON.stringify(userData));
                localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
                console.log('Auth cache refreshed successfully');
                return userData;
            }
        }
    } catch (error) {
        console.warn('Failed to refresh auth cache:', error);
    }
    return null;
};
export const getCurrentUser = async () => {
    console.log('getCurrentUser called, isMobile:', isMobile());

    // For mobile devices, first check if we have valid cached auth data
    // This prevents unnecessary network requests that might fail due to cookie issues
    if (isMobile()) {
        const cachedAuth = localStorage.getItem(MOBILE_AUTH_KEY);
        const cachedUser = localStorage.getItem(MOBILE_USER_KEY);
        console.log('Mobile cached auth:', cachedAuth, 'cached user:', !!cachedUser);

        if (cachedAuth && cachedUser) {
            const authTime = parseInt(cachedAuth);
            const now = Date.now();
            const sevenDays = 7 * 24 * 60 * 60 * 1000; // Extended to 7 days

            if (now - authTime < sevenDays) {
                console.log('Using cached auth data for mobile (first check)');
                return JSON.parse(cachedUser);
            } else {
                console.log('Cached auth expired, clearing...');
                // Clear expired auth
                localStorage.removeItem(MOBILE_AUTH_KEY);
                localStorage.removeItem(MOBILE_USER_KEY);
            }
        }
    }

    try {
        console.log('Making server auth check request...');
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });

        console.log('Server auth response status:', response.status);

        if (response.status === 401) {
            console.log('Server returned 401 - user not authenticated');
            // Clear mobile auth data if server says unauthorized
            if (isMobile()) {
                localStorage.removeItem(MOBILE_AUTH_KEY);
                localStorage.removeItem(MOBILE_USER_KEY);
            }
            return null; // User not authenticated
        }

        if (!response.ok) {
            console.log('Server returned non-ok status:', response.status);
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('Server returned user data:', !!userData);

        // Cache user data for mobile fallback (always, not just when isMobile)
        if (userData) {
            localStorage.setItem(MOBILE_USER_KEY, JSON.stringify(userData));
            if (isMobile()) {
                localStorage.setItem(MOBILE_AUTH_KEY, Date.now().toString());
            }
        }

        return userData;
    } catch (error) {
        console.warn('Server auth check failed:', error);

        // Mobile fallback: check if we have cached auth data as backup
        if (isMobile()) {
            const cachedAuth = localStorage.getItem(MOBILE_AUTH_KEY);
            const cachedUser = localStorage.getItem(MOBILE_USER_KEY);

            if (cachedAuth && cachedUser) {
                const authTime = parseInt(cachedAuth);
                const now = Date.now();
                const sevenDays = 7 * 24 * 60 * 60 * 1000;

                if (now - authTime < sevenDays) {
                    console.log('Using cached auth data for mobile (fallback)');
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