export type InputType = 'text' | 'email' | 'password' | 'file';

export interface AppStore {
    user?: User | null;
    chats?: Chats | null;
    selectedChat?: ChatProps | null;
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

interface ChatProps {
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
    chats: ChatProps[];
}
