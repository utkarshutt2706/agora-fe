import { CustomRoute } from '@/interfaces';
import ChatRoom from '@/pages/ChatRoom';
import Home from '@/pages/Home';
import Register from '@/pages/Register';

export const ROUTES = {
  login: '/',
  register: '/register',
  home: '/home',
  chatRoom: '/home/chat/',
};

export const routes: CustomRoute[] = [
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
