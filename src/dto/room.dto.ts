export interface Room {
  _id: string;
  name: string;
  authorId: string;
  authorName: string;
  active: boolean;
  isPrivate: boolean;
  currentOnlineCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
