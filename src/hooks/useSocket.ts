import { getAuthToken } from '@/lib/storage';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_BE_URL, {
        autoConnect: false,
        auth: {
          token: getAuthToken(),
        },
      });
      socket.connect();
    }

    socketRef.current = socket;

    return () => {
      socket?.disconnect();
    };
  }, []);
  return socketRef.current;
};

export default useSocket;
