import { Chat } from './chat';

export interface SelectedChatState {
    isLoading: boolean;
    isError: string;
    chat: Chat | null;
    users: ChatUser[] | null;
}

export interface ChatUser {
    id: number;
    avatar: string;
    first_name: string;
}
