export type InputKey = 'oldPassword' | 'newPassword' | 'newPasswordConfirm';

export interface EditPasswordProps {
    name: string;
    avatar: string;
    form: Record<InputKey, ProfileForm>;
}

interface ProfileForm {
    value?: string;
    error: string;
}
