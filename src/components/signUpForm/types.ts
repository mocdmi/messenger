export type InputKey =
    | 'email'
    | 'login'
    | 'first_name'
    | 'second_name'
    | 'phone'
    | 'password'
    | 'confirm_password';

export interface SignUpFormProps {
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
        phone: {
            value: string;
            error: string;
        };
        password: {
            value: string;
            error: string;
        };
        confirm_password: {
            value: string;
            error: string;
        };
    };
    isError?: string;
}
