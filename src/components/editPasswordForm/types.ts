export type InputKey = 'oldPassword' | 'newPassword' | 'newPasswordConfirm';

export interface EditPasswordFormProps {
    form: {
        oldPassword: {
            value: string;
            error: string;
        };
        newPassword: {
            value: string;
            error: string;
        };
        newPasswordConfirm: {
            value: string;
            error: string;
        };
    };
    isError?: string;
}
