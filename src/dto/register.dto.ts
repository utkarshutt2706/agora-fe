export interface RegisterRequestDto {
  email: string;
  fullName: string;
  password: string;
}

export interface RegisterResponseDto {
  message: string;
  userFullName: string;
}
