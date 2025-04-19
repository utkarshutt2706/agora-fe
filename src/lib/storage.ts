import { User } from '@/interfaces';
import { LOCAL_STORAGE_KEYS } from './constants';

const setDataToLocalStorage = (
  key: string,
  value: boolean | string | number | object
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setUserDetails = (userData: User) => {
  setDataToLocalStorage(LOCAL_STORAGE_KEYS.userData, userData);
};

export const getUserDetails = () => {
  return getDataFromLocalStorage<User>(LOCAL_STORAGE_KEYS.userData);
};
