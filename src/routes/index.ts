import { CustomRoute } from '@/interfaces';
import ChatRoom from '@/pages/ChatRoom';
import Home from '@/pages/Home';

export const ROUTES = {
  login: '/',
  register: '/register',
  home: '/home',
  chatRoom: '/home/chat/',
};

export const routes: CustomRoute[] = [
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
