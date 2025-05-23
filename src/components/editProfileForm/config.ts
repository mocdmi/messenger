import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { EditProfileFormProps, InputKey } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        email: {
            component: 'EmailInput',
            label: 'Почта',
            type: 'email',
            autocomplete: 'email',
        },
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
            autocomplete: 'username',
        },
        first_name: {
            component: 'FirstNameInput',
            label: 'Имя',
            type: 'text',
            autocomplete: 'given-name',
        },
        second_name: {
            component: 'SecondNameInput',
            label: 'Фамилия',
            type: 'text',
            autocomplete: 'family-name',
        },
        display_name: {
            component: 'ChatNameInput',
            label: 'Имя в чате',
            type: 'text',
            autocomplete: 'nickname',
        },
        phone: {
            component: 'PhoneInput',
            label: 'Телефон',
            type: 'text',
            autocomplete: 'tel',
        },
    },
    validators: {
        email: (value: string) => Validator.validate((value ?? '') as string).isEmail(),
        login: (value: string) => Validator.validate((value ?? '') as string).isLogin(),
        first_name: (value: string) => Validator.validate((value ?? '') as string).isName(),
        second_name: (value: string) => Validator.validate((value ?? '') as string).isName(),
        display_name: () => '',
        phone: (value: string) => Validator.validate((value ?? '') as string).isPhone(),
    },
} as const;

export const initProps: EditProfileFormProps = {
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
        display_name: {
            value: '',
            error: '',
        },
        phone: {
            value: '',
            error: '',
        },
    },
};
