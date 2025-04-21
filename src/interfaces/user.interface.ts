export interface User {
  _id: string;
  email: string;
  fullName: string;
  createdAt: string;
  __v: number;
}

export interface UserWithToken {
  user: User;
  authToken: string;
}
