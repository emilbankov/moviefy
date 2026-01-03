import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

export const register = async (userData) => await post(`${baseUrl}/auth/register`, userData);
export const login = async (userData) => await post(`${baseUrl}/auth/login`, userData);
export const logout = async () => await post(`${baseUrl}/auth/logout`);
export const verifyEmail = async (token) => await post(`${baseUrl}/auth/verify-email`, { token });
export const resendVerification = async (email) => await post(`${baseUrl}/auth/resend-verification`, { email });
// export const getUser = async () => await get(`${baseUrl}/auth/user`);
// export const updateUser = async (userData) => await put(`${baseUrl}/auth/user`, userData);
// export const deleteUser = async () => await del(`${baseUrl}/auth/user`);
// export const getUserProfile = async (userId) => await get(`${baseUrl}/users/${userId}`);
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);
// export const getUserProfile = async (userId) => await get(`${baseUrl}/users/${userId}`);
// export const updateUserProfile = async (userId, userData) => await put(`${baseUrl}/users/${userId}`, userData);
// export const deleteUserProfile = async (userId) => await del(`${baseUrl}/users/${userId}`);