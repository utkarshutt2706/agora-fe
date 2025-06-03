import { User } from '@/interfaces';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  authToken: string;
}

export interface LoginResponseWithUserDto extends LoginResponseDto {
  user: User;
}
