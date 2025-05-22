import { BaseForm } from '@/components';
import { Validator } from '@/core';
import { isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';

export type InputKey = 'chatName';

export interface CreateChatFormProps {
    form: {
        chatName: {
            value: string;
            error: string;
        };
    };
    onSubmit?: (chatName: string) => void;
}

const formConfig = {
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

export default class CreateChatForm extends BaseForm<CreateChatFormProps, InputKey> {
    constructor(props: Pick<CreateChatFormProps, 'onSubmit'>) {
        const initialProps: CreateChatFormProps = {
            form: {
                chatName: {
                    value: '',
                    error: '',
                },
            },
        };

        super(
            {
                ...props,
                ...initialProps,
            },
            formConfig,
            { label: 'Добавить чат' },
        );
    }

    async onSubmit(e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const chatName = this.props.form.chatName.value;
            this.props.onSubmit?.(chatName);
            (e.target as HTMLFormElement).reset();
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(formConfig.formFields)
                .map(
                    ({ component }) => `
                    <div class="${styles.field}">
                        {{{${component}}}}
                    </div>
                `,
                )
                .join('')}
            <div class="${styles.submit}">
                {{{SubmitButton}}}
            </div>
        `;
    }
}
