import { Button, LabelInput } from '../../../components';
import { Block, Validator } from '../../../core';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
import { authService } from '../../../services';
import { Indexed } from '../../../types';
import styles from '../styles.module.css';

interface LoginFormProps extends Indexed {
    formState: {
        login: string;
        password: string;
    };
    errors: {
        login: string;
        password: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isLogin(),
    (value: string) => Validator.validate(value).isPassword(),
];

export default class LoginForm extends Block<LoginFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    login: '',
                    password: '',
                },
                errors: {
                    login: '',
                    password: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: async (e) => {
                        e.preventDefault();

                        validateOnSubmit(
                            validators,
                            this.props.formState,
                            this.props.errors,
                            this.children,
                            (name: string, error: string) => {
                                this.setProps({
                                    ...this.props,
                                    errors: {
                                        ...this.props.errors,
                                        [name]: error,
                                    },
                                });
                            },
                        );

                        if (isErrorsEmpty(this.props.errors)) {
                            await authService.login(this.props.formState);
                        }
                    },
                },
            },
            {
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                login: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.LoginInput as unknown as LabelInput;
                        const error = Validator.validate(el.value).isLogin();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                login: error,
                            },
                        });
                    },
                }) as unknown as Block,
                PasswordInput: new LabelInput({
                    'theme-default': true,
                    name: 'password',
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                password: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.PasswordInput as unknown as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                password: error,
                            },
                        });
                    },
                }) as unknown as Block,
                LoginButton: new Button({
                    'theme-default': true,
                    label: 'Авторизоваться',
                    type: 'submit',
                }) as unknown as Block,
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
