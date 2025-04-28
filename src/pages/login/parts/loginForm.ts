import { Button, LabelInput } from '@components';
import { Block, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import { AuthService } from '@services';
import styles from '../styles.module.css';
import { LoginFormProps, InputKey } from '../types';

const validators = {
    login: (value: unknown) => Validator.validate((value ?? '') as string).isLogin(),
    password: (value: unknown) => Validator.validate((value ?? '') as string).isPassword(),
};

const formFieldsMap = {
    login: {
        component: 'LoginInput',
        label: 'Логин',
        type: 'text',
        autocomplete: 'username',
    },
    password: {
        component: 'PasswordInput',
        label: 'Пароль',
        type: 'password',
        autocomplete: 'current-password',
    },
} as const;

export default class LoginForm extends Block<LoginFormProps> {
    private readonly authService = new AuthService();

    constructor() {
        const children: Record<string, Block> = {};

        Object.entries(formFieldsMap).forEach(
            ([fieldName, { component: componentName, type, autocomplete, label }]) => {
                const inputKey = fieldName as InputKey;

                children[componentName] = new LabelInput({
                    'theme-default': true,
                    name: inputKey,
                    value: '',
                    type: type as 'text' | 'password',
                    label: label,
                    autocomplete: autocomplete,
                    onChange: (e: Event) => this.handleInputChange(e, inputKey),
                    onBlur: (e: Event) => this.handleInputBlur(e, inputKey, componentName),
                }) as Block;
            },
        );

        children.LoginButton = new Button({
            'theme-default': true,
            label: 'Авторизоваться',
            type: 'submit',
        }) as Block;

        super(
            'form',
            {
                form: {
                    login: {
                        value: '',
                        error: '',
                    },
                    password: {
                        value: '',
                        error: '',
                    },
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e: Event) => this.submitHandle(e),
                },
            },
            children,
        );
    }

    private submitHandle(e: Event): void {
        e.preventDefault();
        const errors: Record<string, string> = {};

        Object.values(formFieldsMap).forEach(({ component }) => {
            const input = this.children[component] as Block;
            if (input) {
                input.setProps({
                    error: '',
                });
            }
        });

        Object.entries(this.props.form).forEach(([key, { value }]) => {
            if (key in validators) {
                const typedKey = key as keyof typeof validators;
                const error = validators[typedKey](value);

                if (error) {
                    const fieldConfig = formFieldsMap[key as InputKey];
                    if (fieldConfig) {
                        const input = this.children[fieldConfig.component] as Block;

                        errors[key] = error;

                        input.setProps({
                            error: error,
                        });
                    }
                }
            }
        });

        if (isErrorsEmpty(errors)) {
            console.log(this.props.form);
        }
    }

    private handleInputChange(e: Event, fieldName: InputKey) {
        const el = e.target as HTMLInputElement;

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                },
            },
        });
    }

    private handleInputBlur(e: Event, fieldName: InputKey, componentName: string) {
        const el = e.target as HTMLInputElement;
        const input = this.children[componentName] as LabelInput;
        let error = '';

        if (fieldName in validators) {
            const validator = validators[fieldName as keyof typeof validators];
            error = validator(el.value);
        }

        input.setProps({
            ...input.props,
            error: error,
        });

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                    error: error,
                },
            },
        });
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
