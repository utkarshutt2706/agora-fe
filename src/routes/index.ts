import { JSX } from 'react';
import ChatRoom from '../pages/ChatRoom';
import Home from '../pages/Home';

export const routes = [
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
