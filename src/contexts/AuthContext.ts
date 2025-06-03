import { UserWithToken } from '@/interfaces';
import { createContext } from 'react';

const AuthContext = createContext<UserWithToken | null>(null);

export default AuthContext;
