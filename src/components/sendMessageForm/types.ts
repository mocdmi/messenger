export type InputKey = 'message';

export interface SendMessageFormProps {
    form: {
        message: {
            value: string;
            error: string;
        };
    };
    onSubmit?: (message: string) => void;
}
