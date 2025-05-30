import { FormConfig } from '@/components/baseForm/types';
import { Validator } from '@/core';
import { SendMessageFormProps, InputKey } from './types';

export const config: FormConfig<InputKey> = {
    formFields: {
        message: {
            component: 'MessageInput',
            label: 'Сообщение',
            type: 'text',
            autocomplete: 'off',
        },
    },
    validators: {
        message: (value: string) => Validator.validate((value ?? '') as string).isRequired(),
    },
};

export const initProps: SendMessageFormProps = {
    form: {
        message: {
            value: '',
            error: '',
        },
    },
};
