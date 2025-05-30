import { Link, SignUpForm } from '@/components';
import { initProps } from '@/components/signUpForm';
import { ROUTER } from '@/const';
import { Block } from '@/core';
import styles from './styles.module.css';

export default class SignUpFormContainer extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                SignUpForm: new SignUpForm(initProps) as Block,
                LoginLink: new Link({
                    'theme-default': true,
                    label: 'Войти',
                    to: ROUTER.login,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <h2 class="${styles.title}">Регистрация</h2>
            {{{SignUpForm}}}
            <div class="${styles.login}">
                {{{LoginLink}}}
            </div>
        `;
    }
}
