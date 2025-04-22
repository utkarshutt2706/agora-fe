import { BaseResponse } from '@/dto';
import axios from 'axios';
import { getAuthToken } from './storage';
import { showErrorToast } from './toast';

const BASE_URL = `${import.meta.env.VITE_BE_URL}${
  import.meta.env.VITE_BE_BASE_URL
}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL, // optional: set if all requests share a base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    showErrorToast(error.response.data.error);
    return Promise.reject(error);
  }
);

export const axiosGet = async <T>(url: string) => {
  const response = await axiosInstance.get<void, BaseResponse<T>>(url);
  if (response && response.data) {
    return response.data;
  } else {
    return null;
  }
};

export const axiosPost = async <T, R>(url: string, body: T) => {
  const response = await axiosInstance.post<T, BaseResponse<R>>(url, body);
  if (response && response.data) {
    return response.data;
  } else {
    return null;
  }
};
