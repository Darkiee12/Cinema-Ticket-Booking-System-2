import axios, { AxiosInstance } from "axios";

const BASE_URL = 'http://localhost:3500/api';

// Public Axios instance
const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Private Axios instance with credentials
export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosPublic;
