import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { InputKey, SignUpFormProps } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        email: {
            component: 'EmailInput',
            type: 'email',
            label: 'Почта',
            autocomplete: 'email',
        },
        login: {
            component: 'LoginInput',
            type: 'text',
            label: 'Логин',
            autocomplete: 'username',
        },
        first_name: {
            component: 'FirstNameInput',
            type: 'text',
            label: 'Имя',
            autocomplete: 'given-name',
        },
        second_name: {
            component: 'SecondNameInput',
            type: 'text',
            label: 'Фамилия',
            autocomplete: 'family-name',
        },
        phone: {
            component: 'PhoneInput',
            type: 'text',
            label: 'Телефон',
            autocomplete: 'tel',
        },
        password: {
            component: 'PasswordInput',
            type: 'password',
            label: 'Пароль',
            autocomplete: 'current-password',
        },
        confirm_password: {
            component: 'ConfirmPasswordInput',
            type: 'password',
            label: 'Пароль (ещё раз)',
            autocomplete: 'new-password',
        },
    },
    validators: {
        email: (value: string) => Validator.validate((value ?? '') as string).isEmail(),
        login: (value: string) => Validator.validate((value ?? '') as string).isLogin(),
        first_name: (value: string) => Validator.validate((value ?? '') as string).isName(),
        second_name: (value: string) => Validator.validate((value ?? '') as string).isName(),
        phone: (value: string) => Validator.validate((value ?? '') as string).isPhone(),
        password: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
        confirm_password: (value: string) =>
            Validator.validate((value ?? '') as string).isPassword(),
    },
} as const;

export const initProps: SignUpFormProps = {
    form: {
        email: {
            value: '',
            error: '',
        },
        login: {
            value: '',
            error: '',
        },
        first_name: {
            value: '',
            error: '',
        },
        second_name: {
            value: '',
            error: '',
        },
        phone: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
        confirm_password: {
            value: '',
            error: '',
        },
    },
};
