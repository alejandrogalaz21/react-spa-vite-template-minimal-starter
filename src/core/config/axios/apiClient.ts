// src/core/config/axios/apiClient.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CONFIG } from 'src/config-global';

/**
 * Axios singleton instance used across the entire application.
 * This is pure infrastructure and contains NO business logic.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Attaches the Authorization token to every request.
 * This should be called after login or when the app boots
 * if a token already exists (e.g. from localStorage).
 */
export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 * Removes the Authorization token from all future requests.
 * Used on logout or when the token becomes invalid.
 */
export const removeAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

/**
 * Global response interceptor.
 * This is where we normalize errors, handle expired tokens,
 * or trigger global side-effects (like logout on 401).
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Token expired or invalid
    if (status === 401) {
      // Do NOT dispatch redux here.
      // Emit events, call auth service, or let epics react to it.
      console.warn('Unauthorized request - token may be expired');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
