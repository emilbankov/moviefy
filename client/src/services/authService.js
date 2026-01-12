import { get, post } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

/* =========================
   AUTH
========================= */

export const register = async (userData) => {
  return post(`${baseUrl}/auth/register`, userData);
};

export const login = async ({ email, password }) => {
  const formData = new URLSearchParams({
    email,
    password,
  });

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  // Spring Security often returns 204 on success
  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Login failed');
  }

  return response.json();
};

export const logout = async () => {
  await post(`${baseUrl}/auth/logout`);
};

/* =========================
   SESSION
========================= */

export const getCurrentUser = async () => {
  try {
    return await get(`${baseUrl}/auth/me`);
  } catch {
    return null;
  }
};

/* =========================
   ACCOUNT
========================= */

export const verifyEmail = async (token) => {
  return post(`${baseUrl}/auth/verify-email`, { token });
};

export const resendVerification = async (token) => {
  return post(`${baseUrl}/auth/resend-email`, { token });
};

export const requestPasswordReset = async (email) => {
  return post(`${baseUrl}/auth/password-reset/request`, { email });
};

export const checkPasswordResetToken = async (token) => {
  return post(`${baseUrl}/auth/password-reset/token-check`, { token });
};

export const confirmPasswordReset = async (token, password) => {
  return post(`${baseUrl}/auth/password-reset/confirm`, {
    token,
    password,
  });
};

/* =========================
   USER
========================= */

export const getUserProfile = async () => {
  return get(`${baseUrl}/users/me`);
};
