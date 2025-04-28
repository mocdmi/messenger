import { Button, LabelInput } from '@components';
import { Block, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import styles from '../styles.module.css';
import { SignUpFormProps, InputKey } from '../types';
import { AuthService } from '@services';

const validators: Record<InputKey, (value: string) => string> = {
    email: (value: string) => Validator.validate(value).isEmail(),
    login: (value: string) => Validator.validate(value).isLogin(),
    firstName: (value: string) => Validator.validate(value).isName(),
    secondName: (value: string) => Validator.validate(value).isName(),
    phone: (value: string) => Validator.validate(value).isPhone(),
    password: (value: string) => Validator.validate(value).isPassword(),
    confirmPassword: (value: string) => Validator.validate(value).isPassword(),
};

const formFieldsMap = {
    email: {
        component: 'EmailInput',
        type: 'email',
        label: 'Почта',
        autocomplete: 'email',
    },
    login: {
        component: 'LoginInput',
        type: 'text',
        label: 'Логин',
        autocomplete: 'username',
    },
    firstName: {
        component: 'FirstNameInput',
        type: 'text',
        label: 'Имя',
        autocomplete: 'given-name',
    },
    secondName: {
        component: 'SecondNameInput',
        type: 'text',
        label: 'Фамилия',
        autocomplete: 'family-name',
    },
    phone: {
        component: 'PhoneInput',
        type: 'text',
        label: 'Телефон',
        autocomplete: 'tel',
    },
    password: {
        component: 'PasswordInput',
        type: 'password',
        label: 'Пароль',
        autocomplete: 'current-password',
    },
    confirmPassword: {
        component: 'ConfirmPasswordInput',
        type: 'password',
        label: 'Пароль (ещё раз)',
        autocomplete: 'new-password',
    },
} as const;

export default class SignUpForm extends Block<SignUpFormProps> {
    private readonly authService = new AuthService();

    constructor() {
        const children: Record<string, Block> = {};

        Object.entries(formFieldsMap).forEach(
            ([fieldName, { component, type, label, autocomplete }]) => {
                const inputKey = fieldName as InputKey;

                children[component] = new LabelInput({
                    name: inputKey,
                    value: '',
                    type: type as 'text' | 'password' | 'email',
                    label: label,
                    'theme-default': true,
                    autocomplete: autocomplete,
                    onChange: (e: Event) => this.handleInputChange(e, inputKey),
                    onBlur: (e: Event) => this.handleInputBlur(e, inputKey, component),
                }) as Block;
            },
        );

        children.SignInButton = new Button({
            'theme-default': true,
            label: 'Зарегистрироваться',
            type: 'submit',
        }) as Block;

        super(
            'form',
            {
                form: {
                    email: {
                        value: '',
                        error: '',
                    },
                    login: {
                        value: '',
                        error: '',
                    },
                    firstName: {
                        value: '',
                        error: '',
                    },
                    secondName: {
                        value: '',
                        error: '',
                    },
                    phone: {
                        value: '',
                        error: '',
                    },
                    password: {
                        value: '',
                        error: '',
                    },
                    confirmPassword: {
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

    private submitHandle(e: Event) {
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
            ${Object.values(formFieldsMap)
                .map(
                    ({ component }) => `
                <div class="${styles.field}">
                    {{{${component}}}}
                </div>
            `,
                )
                .join('')}
            <div class="${styles.submit}">
                {{{SignInButton}}}
            </div>
        `;
    }
}
