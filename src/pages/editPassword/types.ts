export type InputKey = 'oldPassword' | 'newPassword' | 'newPasswordConfirm';

export interface EditPasswordProps {
    name: string;
    form: Record<InputKey, ProfileForm>;
}

interface ProfileForm {
    value?: string;
    error: string;
}
