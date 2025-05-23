import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { EditPasswordFormProps, InputKey } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        oldPassword: {
            component: 'OldPasswordInput',
            label: 'Старый пароль',
            type: 'password',
            autocomplete: 'current-password',
        },
        newPassword: {
            component: 'NewPasswordInput',
            label: 'Новый пароль',
            type: 'password',
            autocomplete: 'new-password',
        },
        newPasswordConfirm: {
            component: 'NewPasswordConfirmInput',
            label: 'Повторите новый пароль',
            type: 'password',
            autocomplete: 'new-password',
        },
    },
    validators: {
        oldPassword: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
        newPassword: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
        newPasswordConfirm: (value: string) =>
            Validator.validate((value ?? '') as string).isPassword(),
    },
} as const;

export const initProps: EditPasswordFormProps = {
    form: {
        oldPassword: {
            value: '',
            error: '',
        },
        newPassword: {
            value: '',
            error: '',
        },
        newPasswordConfirm: {
            value: '',
            error: '',
        },
    },
};
