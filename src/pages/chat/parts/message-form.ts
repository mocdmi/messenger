import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class MessageForm extends Block {
    constructor() {
        super(
            'form',
            {
                className: styles.message,
            },
            {
                MessageInput: new LabelInput({
                    'theme-color': true,
                    type: 'text',
                    name: 'message',
                    placeholder: 'Сообщение',
                    rounded: true,
                    value: '',
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
