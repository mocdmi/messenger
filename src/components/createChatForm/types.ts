export type InputKey = 'chatName';

export interface CreateChatFormProps {
    form: {
        chatName: {
            value: string;
            error: string;
        };
    };
    onSubmit?: (chatName: string) => void;
    isError?: string;
}
