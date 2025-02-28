import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class SignInForm extends Block {
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
                EmailInput: new LabelInput({
                    name: 'email',
                    value: '',
                    type: 'email',
                    label: 'Почта',
                    'theme-default': true,
                    required: true,
                }) as Block,
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                }) as Block,
                FirstNameInput: new LabelInput({
                    'theme-default': true,
                    name: 'first_name',
                    value: '',
                    type: 'text',
                    label: 'Имя',
                    required: true,
                }) as Block,
                SecondNameInput: new LabelInput({
                    'theme-default': true,
                    name: 'second_name',
                    value: '',
                    type: 'text',
                    label: 'Фамилия',
                    required: true,
                }) as Block,
                PhoneInput: new LabelInput({
                    'theme-default': true,
                    name: 'phone',
                    value: '',
                    type: 'text',
                    label: 'Телефон',
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
                ConfirmPasswordInput: new LabelInput({
                    'theme-default': true,
                    name: 'confirm_password',
                    value: '',
                    type: 'password',
                    label: 'Пароль (ещё раз)',
                    required: true,
                }) as Block,
                SignInButton: new Button({
                    'theme-default': true,
                    label: 'Зарегистрироваться',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.field}">
                {{{EmailInput}}}
            </div>
            <div class="${styles.field}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.field}">
                {{{FirstNameInput}}}
            </div>
            <div class="${styles.field}">
                {{{SecondNameInput}}}
            </div>
            <div class="${styles.field}">
                {{{PhoneInput}}}
            </div>
            <div class="${styles.field}">
                {{{PasswordInput}}}
            </div>
            <div class="${styles.field}">
                {{{ConfirmPasswordInput}}}
            </div>
            <div class="${styles.submit}">
                {{{SignInButton}}}
            </div>
        `;
    }
}
