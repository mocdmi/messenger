export type InputType = 'text' | 'email' | 'password' | 'file';

export interface AppStore {
    user?: User | null;
    chats?: Chats | null;
    selectedChat?: SelectedChat | null;
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

interface User {
    isLoading: boolean;
    isError: boolean;
    user: UserProps;
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

interface Chats {
    isLoading: boolean;
    isError: boolean;
    chats: Chat[];
}

export interface ChatUser {
    id: number;
    avatar: string;
    first_name: string;
}

interface SelectedChat {
    isLoading: boolean;
    isError: boolean;
    chat: Chat;
    users: ChatUser[];
}
