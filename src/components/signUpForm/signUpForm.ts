import { defaultTheme } from '@/components/baseForm';
import { BaseForm } from '@/components';
import { connect, isErrorsEmpty } from '@/helpers';
import mapStateToProps from './mapStateToProps';
import { AuthService } from '@/services';
import { AppStore } from '@/store';
import { SignUpRequestDto } from '@/types';
import { SignUpFormProps, InputKey } from './types';
import { config } from './config';
import styles from './styles.module.css';

class SignUpForm extends BaseForm<SignUpFormProps, InputKey> {
    private authService = new AuthService();

    constructor(props: SignUpFormProps) {
        super(props, config, { label: 'Зарегистрироваться' }, (props) => defaultTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const formData: Omit<SignUpRequestDto, 'confirm_password'> = Object.entries(
                this.props.form,
            ).reduce(
                (acc, [key, value]) => {
                    acc[key as InputKey] = value.value as string;
                    return acc;
                },
                {} as Record<InputKey, string>,
            );

            await this.authService.signUp(formData);
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(config.formFields)
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
            {{#if isError}}
                <div class="${styles.errorMessage}">
                    {{isError}}
                </div>
            {{/if}}
        `;
    }
}

export default connect<AppStore, SignUpFormProps>(mapStateToProps)(SignUpForm);
