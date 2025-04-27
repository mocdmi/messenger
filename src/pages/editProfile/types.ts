type InputName = 'email' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'phone';

export interface EditProfileProps {
    name: string;
    form: Record<InputName, ProfileForm>;
}

interface ProfileForm {
    value?: string;
    error: string;
}
