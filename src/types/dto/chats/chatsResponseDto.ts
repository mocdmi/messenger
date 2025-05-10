import { ChatUserDto } from '../base/chatUserDto';
import { ErrorDto } from '../base/errorDto';
import { ChatDto } from '../base/chatDto';

export type ChatResponseDto = ChatDto[];

export type CreateChatResponseDto =
    | {
          id: number;
      }
    | ErrorDto;

export interface DeleteChatResponseDto {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
        created_by: string;
    };
}

export type GetChatUsersResponseDto = ChatUserDto[];

export type AddUsersToChatResponseDto = string | ErrorDto;

export type DeleteUsersFromChatResponseDto = string | ErrorDto;

export type GetChatTokenResponseDto = {
    token: string;
};
