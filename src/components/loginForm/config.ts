import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { InputKey, LoginFormProps } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
            autocomplete: 'username',
        },
        password: {
            component: 'PasswordInput',
            label: 'Пароль',
            type: 'password',
            autocomplete: 'current-password',
        },
    },
    validators: {
        login: (value: string) => Validator.validate((value ?? '') as string).isLogin(),
        password: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
    },
} as const;

export const initProps: LoginFormProps = {
    form: {
        login: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    },
};
