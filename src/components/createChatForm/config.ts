import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { CreateChatFormProps, InputKey } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        chatName: {
            component: 'ChatNameInput',
            label: 'Название чата',
            type: 'text',
        },
    },
    validators: {
        chatName: (value: string) => Validator.validate((value ?? '') as string).isRequired(),
    },
} as const;

export const initProps: CreateChatFormProps = {
    form: {
        chatName: {
            value: '',
            error: '',
        },
    },
    isError: '',
};
