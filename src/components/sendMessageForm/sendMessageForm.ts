import { Button, LabelInput } from '@/components';
import { Block, Validator } from '@/core';
import styles from './styles.module.css';

interface SendMessageFormProps {
    form: {
        message: {
            value: string;
            error: string;
        };
    };
    onSubmit?: (e: Event, message: string, errors: Record<string, string>) => void;
}

export default class SendMessageForm extends Block<SendMessageFormProps> {
    constructor(props: Pick<SendMessageFormProps, 'onSubmit'>) {
        super(
            'form',
            {
                ...props,
                form: {
                    message: {
                        value: '',
                        error: '',
                    },
                },
                className: styles.messageForm,
                events: {
                    submit: (e) => this.submitHandle(e),
                },
            },
            {
                MessageInput: new LabelInput({
                    'theme-color': true,
                    type: 'text',
                    name: 'message',
                    placeholder: 'Сообщение',
                    rounded: true,
                    value: '',
                    onChange: (e: Event) => this.handleChange(e),
                    onBlur: (e: Event) => this.handleBlur(e),
                }) as Block,
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    rounded: true,
                    icon: 'next',
                }) as Block,
            },
        );
    }

    handleChange = (e: Event) => {
        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                message: {
                    ...this.props.form.message,
                    value: (e.target as HTMLInputElement).value,
                },
            },
        });
    };

    handleBlur = (e: Event) => {
        const el = e.target as HTMLInputElement;
        const input = this.children.MessageInput as LabelInput;
        let error = '';

        error = Validator.validate(el.value).isRequired();

        input.setProps({
            ...input.props,
            error: error,
        });

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                message: {
                    value: el.value,
                    error: error,
                },
            },
        });
    };

    submitHandle = (e: Event) => {
        e.preventDefault();
        const input = this.children.MessageInput as LabelInput;
        let error = '';

        error = Validator.validate(this.props.form.message.value).isRequired();

        input.setProps({
            ...input.props,
            error: error,
        });

        this.props.onSubmit?.(e, this.props.form.message.value, { message: error });
    };

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.input}">
                {{{MessageInput}}}
            </div>
            <div class="${styles.button}">
                {{{SendButton}}}
            </div>
        `;
    }
}
