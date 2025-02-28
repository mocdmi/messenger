import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class AddContactForm extends Block {
    constructor() {
        super(
            'form',
            {
                attrs: {
                    action: '#',
                    method: 'POST',
                },
            },
            {
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                }) as Block,
                AddButton: new Button({
                    'theme-default': true,
                    label: 'Добавить',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.actionField}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.actionSubmit}">
                {{{AddButton}}}
            </div>
        `;
    }
}
