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

export interface GetMessageResponseDto {
    id: string;
    time: string;
    user_id: string;
    content: string;
    type: 'message';
}

export interface OldMessageDto {
    id: string;
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
}

export type GetOldMessagesResponseDto = OldMessageDto[];
