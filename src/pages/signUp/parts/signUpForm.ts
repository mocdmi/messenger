import { BaseForm, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import styles from '../styles.module.css';
import { SignUpFormProps, InputKey } from '../types';
import { AuthService } from '@services';

const formConfig = {
    formFields: {
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
    },
    validators: {
        email: (value: string) => Validator.validate((value ?? '') as string).isEmail(),
        login: (value: string) => Validator.validate((value ?? '') as string).isLogin(),
        firstName: (value: string) => Validator.validate((value ?? '') as string).isName(),
        secondName: (value: string) => Validator.validate((value ?? '') as string).isName(),
        phone: (value: string) => Validator.validate((value ?? '') as string).isPhone(),
        password: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
        confirmPassword: (value: string) =>
            Validator.validate((value ?? '') as string).isPassword(),
    },
} as const;

export default class SignUpForm extends BaseForm<SignUpFormProps, InputKey> {
    private readonly authService = new AuthService();

    constructor() {
        const initialProps: SignUpFormProps = {
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
        };

        super(initialProps, formConfig, { label: 'Зарегистрироваться' });
    }

    onSubmit(_e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const formData = {
                email: this.props.form.email.value,
                login: this.props.form.login.value,
                firstName: this.props.form.firstName.value,
                secondName: this.props.form.secondName.value,
                phone: this.props.form.phone.value,
                password: this.props.form.password.value,
            };

            console.log(formData);
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(formConfig.formFields)
                .map(
                    ({ component }) => `
                    <div class="${styles.field}">
                        {{{${component}}}}
                    </div>
                `,
                )
                .join('')}
            <div class="${styles.submit}">
                {{{SubmitButton}}}
            </div>
        `;
    }
}
