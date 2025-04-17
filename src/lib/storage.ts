import { User } from '@/interfaces';
import { LOCAL_STORAGE_KEYS } from './constants';

const setDataToLocalStorage = (
  key: string,
  value: boolean | string | number | object
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setUserDetails = (userData: User) => {
  setDataToLocalStorage(LOCAL_STORAGE_KEYS.userData, userData);
};

export const getUserDetails = () => {
  getDataFromLocalStorage(LOCAL_STORAGE_KEYS.userData);
};
