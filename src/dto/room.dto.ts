export interface Room {
  isPrivate: boolean;
  _id: string;
  name: string;
  author: string;
  active: boolean;
  currentOnlineCount: number;
  createdAt: string;
  __v: number;
}
