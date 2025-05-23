import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { ChatActionsFormProps, InputKey } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
        },
    },
    validators: {
        login: (value: string) => Validator.validate((value ?? '') as string).isRequired(),
    },
} as const;

export const initProps: ChatActionsFormProps = {
    form: {
        login: {
            value: '',
            error: '',
        },
    },
};
