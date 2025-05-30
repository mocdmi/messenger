import { Chat } from './chat';

export interface ChatsState {
    isLoading: boolean;
    isError: string;
    chats: Chat[] | null;
}
