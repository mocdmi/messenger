export type InputType = 'text' | 'email' | 'password' | 'file';

export interface AppStore {
    user: {
        isLoading: boolean;
        isError: boolean;
        user: UserProps | null;
    };
    chats: {
        isLoading: boolean;
        isError: boolean;
        chats: Chat[] | null;
    };
    selectedChat: {
        isLoading: boolean;
        isError: boolean;
        chat: Chat | null;
        users: ChatUser[] | null;
    };
}

interface UserProps {
    id: number;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
}

export interface Chat {
    id: number;
    title: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
    avatar: string;
}

export interface ChatUser {
    id: number;
    avatar: string;
    first_name: string;
}
