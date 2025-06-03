import { io } from 'socket.io-client';
import { getAuthToken } from './storage';

const url = import.meta.env.VITE_BE_URL;

const socket = io(url, {
  autoConnect: false,
  auth: {
    token: getAuthToken(),
  },
});

export default socket;
