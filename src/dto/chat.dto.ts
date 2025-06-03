import { ChatType } from '@/enums';

export interface ChatResponseDto {
  _id: string;
  body: string;
  authorId: string;
  authorName: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  type: ChatType;
  __v: number;
}

export interface ChatRequestDto {
  body: string;
  roomId: string;
  type: ChatType;
}
