import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


axiosPublic.defaults.withCredentials = true;
axiosPrivate.defaults.withCredentials = true;