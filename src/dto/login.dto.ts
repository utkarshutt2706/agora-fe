import { User } from '@/interfaces';

export interface LoginRequestDto {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginResponseDto {
  authToken: string;
}

export interface LoginResponseWithUserDto extends LoginResponseDto {
  user: User;
}
