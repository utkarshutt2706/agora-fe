import { UserWithToken } from '@/interfaces';
import { createContext } from 'react';

export const AuthContext = createContext<UserWithToken | null>(null);
