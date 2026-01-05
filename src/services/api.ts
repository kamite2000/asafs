import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('asafs_user');
    if (user) {
        const { token } = JSON.parse(user);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
