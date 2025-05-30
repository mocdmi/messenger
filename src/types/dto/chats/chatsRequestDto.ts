export interface ChatRequestDto {
    title?: string;
    offset?: number;
    limit?: number;
}

export interface CreateChatRequestDto {
    title: string;
}

export interface DeleteChatRequestDto {
    chatId: number;
}

export interface AddUsersToChatRequestDto {
    users: number[];
    chatId: number;
}

export interface DeleteUsersFromChatRequestDto {
    users: number[];
    chatId: number;
}

export interface GetChatUsersRequestDto {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export type GetMessageRequestDto = string;
