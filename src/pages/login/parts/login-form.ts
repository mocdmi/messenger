import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class LoginForm extends Block {
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
                PasswordInput: new LabelInput({
                    'theme-default': true,
                    name: 'password',
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    required: true,
                }) as Block,
                LoginButton: new Button({
                    'theme-default': true,
                    label: 'Авторизоваться',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.field}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.field}">
                {{{PasswordInput}}}
            </div>
            <div class="${styles.submit}">
                {{{LoginButton}}}
            </div>
        `;
    }
}
