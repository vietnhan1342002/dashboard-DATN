import axios from 'axios';


const axiosInstance = axios.create({
    // baseURL: 'https://13.211.141.240.nip.io/api/v1',
    baseURL: 'http://localhost:8080/api/v1/',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
