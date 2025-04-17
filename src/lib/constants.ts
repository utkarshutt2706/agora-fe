const BASE_URL = import.meta.env.VITE_BE_URL;

export const API_ENDPOINTS = {
  login: `${BASE_URL}user/login`,
  register: `${BASE_URL}user`,
};

export const LOCAL_STORAGE_KEYS = {
  userData: 'USER_DATA',
};
