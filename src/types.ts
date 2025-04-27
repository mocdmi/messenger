export type InputType = 'text' | 'email' | 'password' | 'file';

export interface AppStore {
    user: User | null;
    editProfile: EditProfile | null;
}

interface UserProps {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

interface User {
    isLoading: boolean;
    isError: boolean;
    user: UserProps;
}

interface EditProfile {
    isLoading: boolean;
    isError: boolean;
    form: UserProps;
    errors: UserProps;
}
