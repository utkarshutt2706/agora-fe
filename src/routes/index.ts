import ChatRoom from '@/pages/ChatRoom';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import { JSX } from 'react';

export const routes = [
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/home',
    Component: Home,
    children: [
      {
        path: 'chat/:roomId',
        Component: ChatRoom,
      },
    ],
  },
];

export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  children?: CustomRoute[];
}
