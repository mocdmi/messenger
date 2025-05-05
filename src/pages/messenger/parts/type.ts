export type InputKey = 'login';

export interface UserActionFormProps {
    form: {
        login: {
            value: string;
            error: string;
        };
    };
    onSubmit?: (userId: number) => void;
}

export interface UserActionProps {
    onSubmit: (userId: number) => void;
}
