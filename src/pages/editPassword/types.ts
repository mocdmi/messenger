import { UpdateUserPasswordRequestDto } from '../../types';

export type InputKey = 'oldPassword' | 'newPassword' | 'newPasswordConfirm';

export interface EditPasswordProps {
    name: string;
    avatar: string;
    form: Record<InputKey, ProfileForm>;
    onSubmit?: (form: UpdateUserPasswordRequestDto) => void;
}

interface ProfileForm {
    value?: string;
    error: string;
}
