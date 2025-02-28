import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface MessageFormProps {
    formState: {
        message: string;
    };
}

export default class MessageForm extends Block<MessageFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    message: '',
                },
                className: styles.message,
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        console.log(this.props.formState);
                    },
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
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                message: el.value,
                            },
                        });
                    },
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

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.input}">
                {{{MessageInput}}}
            </div>
            {{{SendButton}}}
        `;
    }
}
