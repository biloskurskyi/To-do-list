import axios, {AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create(
    {
        baseURL: 'http://localhost:8000/api',
    }
);

axiosInstance.interceptors.request.use((config) => {
    const token:string = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
