import { BaseUserDto } from './baseUserDto';

export interface ChatDto {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        user: BaseUserDto;
        time: string;
        content: string;
    };
}
