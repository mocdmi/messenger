import { BaseForm } from '@/components';
import { isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';

export type InputKey = 'login';

export interface ChatUsersActionsFormProps {
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

export default class ChatUsersActionsForm extends BaseForm<ChatUsersActionsFormProps, InputKey> {
    constructor(props: Pick<ChatUsersActionsFormProps, 'onSubmit' | 'buttonTitle'>) {
        const initialProps: ChatUsersActionsFormProps = {
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
