import { defaultTheme } from '@/components/baseForm';
import { BaseForm } from '@/components';
import { connect, isErrorsEmpty } from '@/helpers';
import mapStateToProps from './mapStateToProps';
import { AppStore } from '@/store';
import { SignInRequestDto } from '@/types';
import { config } from './config';
import { AuthService } from '@/services';
import { InputKey, LoginFormProps } from './types';
import styles from './styles.module.css';

class LoginForm extends BaseForm<LoginFormProps, InputKey> {
    private readonly authService = new AuthService();

    constructor(props: LoginFormProps) {
        super(props, config, { label: 'Авторизоваться' }, (props) => defaultTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>): Promise<void> {
        if (isErrorsEmpty(errors)) {
            const formData: SignInRequestDto = {
                login: this.props.form.login.value,
                password: this.props.form.password.value,
            };
            await this.authService.login(formData);
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(config.formFields)
                .map(
                    (field) => `
                        <div class="${styles.field}">
                            {{{${field.component}}}}
                        </div>
                    `,
                )
                .join('')}
            <div class="${styles.submit}">
                {{{SubmitButton}}}
            </div>
            {{#if isError}}
                <div class="${styles.errorMessage}">
                    {{isError}}
                </div>
            {{/if}}
        `;
    }
}

export default connect<AppStore, LoginFormProps>(mapStateToProps)(LoginForm);
