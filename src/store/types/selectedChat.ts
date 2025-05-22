import { Chat } from './chat';

export interface SelectedChatState {
    isLoading: boolean;
    isError: string;
    chat: SelectedChat | null;
    users: ChatUser[] | null;
    messages: ChatMessage[] | null;
}

export interface ChatUser {
    id: number;
    avatar: string;
    first_name: string;
}

export interface ChatMessage {
    id: number;
    message: string;
    userId: number;
    time: string;
    timestamp: number;
}

export type SelectedChat = Pick<Chat, 'id' | 'title' | 'avatar'>;
