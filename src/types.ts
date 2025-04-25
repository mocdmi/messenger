export interface AppStore {
    user: User | null;
}

interface User {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}
