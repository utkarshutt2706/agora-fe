import { User } from '@/interfaces';
import { LOCAL_STORAGE_KEYS } from './constants';

const setDataToStorage = (
  key: string,
  value: boolean | string | number | object,
  store: 'local' | 'session'
) => {
  if (store === 'local') {
    localStorage.setItem(key, JSON.stringify(value));
  }
  if (store === 'session') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

const getDataFromStorage = <T>(
  key: string,
  store: 'local' | 'session'
): T | null => {
  let item: string | null = null;
  if (store === 'local') {
    item = localStorage.getItem(key);
  }
  if (store === 'session') {
    item = sessionStorage.getItem(key);
  }
  return item ? (JSON.parse(item) as T) : null;
};

export const removeDataFromStorage = (
  key: string,
  store: 'local' | 'session'
) => {
  if (store === 'local') {
    localStorage.removeItem(key);
  }
  if (store === 'session') {
    sessionStorage.removeItem(key);
  }
};

export const setUserDetails = (userData: User) => {
  setDataToStorage(LOCAL_STORAGE_KEYS.userData, userData, 'session');
};

export const getUserDetails = () => {
  return getDataFromStorage<User>(LOCAL_STORAGE_KEYS.userData, 'session');
};

const removeUserDetails = () => {
  removeDataFromStorage(LOCAL_STORAGE_KEYS.userData, 'session');
};

export const setAuthToken = (token: string) => {
  setDataToStorage('token', token, 'session');
};

export const getAuthToken = () => {
  return getDataFromStorage<string>('token', 'session');
};

const removeAuthToken = () => {
  removeDataFromStorage('token', 'session');
};

export const removeLoginDetails = () => {
  removeAuthToken();
  removeUserDetails();
};
