export interface UserState {
    isLoading: boolean;
    isError: string;
    user: User | null;
}

export interface User {
    id: number;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
}
