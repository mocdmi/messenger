export type InputKey = 'email' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'phone';

export interface EditProfileFormProps {
    form: {
        email: {
            value: string;
            error: string;
        };
        login: {
            value: string;
            error: string;
        };
        first_name: {
            value: string;
            error: string;
        };
        second_name: {
            value: string;
            error: string;
        };
        display_name: {
            value: string;
            error: string;
        };
        phone: {
            value: string;
            error: string;
        };
    };
    isError?: string;
}
