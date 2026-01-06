import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

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
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};
export const logout = async () => await post(`${baseUrl}/auth/logout`);
export const getCurrentUser = async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (response.status === 401) {
        return null; // User not authenticated
    }

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
};
export const verifyEmail = async (token) => await post(`${baseUrl}/auth/verify-email`, { token });
export const requestPasswordReset = async (email) => await post(`${baseUrl}/auth/password-reset/request`, { email });
export const checkPasswordResetToken = async (token) => await post(`${baseUrl}/auth/password-reset/token-check`, { token });
export const confirmPasswordReset = async (token, password) => await post(`${baseUrl}/auth/password-reset/confirm`, { token, password });

export const resendVerification = async (token) => await post(`${baseUrl}/auth/resend-email`, { token });
// export const getUser = async () => await get(`${baseUrl}/auth/user`);
// export const updateUser = async (userData) => await put(`${baseUrl}/auth/user`, userData);
// export const deleteUser = async () => await del(`${baseUrl}/auth/user`);
// export const getUserProfile = async (userId) => await get(`${baseUrl}/users/${userId}`);
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);
// export const getUserProfile = async (userId) => await get(`${baseUrl}/users/${userId}`);
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);