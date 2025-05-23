export type InputKey = 'login';

export interface ChatActionsFormProps {
    form: {
        login: {
            value: string;
            error: string;
        };
    };
    buttonTitle?: string;
    onSubmit?: (userId: number) => void;
    isError?: string;
}
