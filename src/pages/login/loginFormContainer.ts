import { Link, LoginForm } from '@/components';
import { initProps } from '@/components/loginForm';
import { ROUTER } from '@/const';
import { Block } from '@/core';
import styles from './styles.module.css';

export default class LoginFormContainer extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                LoginForm: new LoginForm(initProps) as Block,
                SignUpLink: new Link({
                    'theme-default': true,
                    label: 'Нет аккаунта?',
                    to: ROUTER.signUp,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <h2 class="${styles.title}">Вход</h2>
            {{{LoginForm}}}
            <div class="${styles.signUp}">
                {{{SignUpLink}}}
            </div>
        `;
    }
}
