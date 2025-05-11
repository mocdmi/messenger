import { BaseForm } from '@/core';
import { isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';

export type InputKey = 'login';

export interface ChatActionsFormProps {
    form: {
        login: {
            value: string;
            error: string;
        };
    };
    buttonTitle: string;
    onSubmit?: (userId: number) => void;
}

const formConfig = {
    formFields: {
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
        },
    },
    validators: {
        login: () => '',
    },
} as const;

export default class ChatActionsForm extends BaseForm<ChatActionsFormProps, InputKey> {
    constructor(props: Pick<ChatActionsFormProps, 'onSubmit' | 'buttonTitle'>) {
        const initialProps: ChatActionsFormProps = {
            form: {
                login: {
                    value: '',
                    error: '',
                },
            },
            buttonTitle: '',
        };

        super(
            {
                ...props,
                ...initialProps,
            },
            formConfig,
            { label: props.buttonTitle },
        );
    }

    async onSubmit(e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const userId = this.props.form.login.value;
            this.props.onSubmit?.(Number(userId));
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
