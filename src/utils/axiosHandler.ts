import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance with a base URL
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://snaplayout-webapi.onrender.com/api/',
    timeout: 5000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add authorization tokens or other custom headers here
        // Example: config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        // Handle errors globally
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// GET request
export const getRequest = async (url: string, params?: object) => {
    try {
        return await axiosInstance.get(url, { params });
    } catch (error) {
        throw error;
    }
};

// POST request
export const postRequest = async (url: string, data: object) => {
    try {
        return await axiosInstance.post(url, data);
    } catch (error) {
        throw error;
    }
};

// PUT request
export const putRequest = async (url: string, data: object) => {
    try {
        return await axiosInstance.put(url, data);
    } catch (error) {
        throw error;
    }
};

// DELETE request
export const deleteRequest = async (url: string, params?: object) => {
    try {
        return await axiosInstance.delete(url, { params });
    } catch (error) {
        throw error;
    }
};