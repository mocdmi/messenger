import { BaseForm } from '@/components';
import { blankTheme } from '@/components/baseForm';
import { Store } from '@/core';
import { connect, isErrorsEmpty } from '@/helpers';
import { UserDto } from '@/types';
import mapStateToProps from './mapStateToProps';
import { AuthService, UserService } from '@/services';
import { AppStore } from '@/store';
import { config } from './config';
import { EditProfileFormProps, InputKey } from './types';
import styles from './styles.module.css';

class EditProfileForm extends BaseForm<EditProfileFormProps, InputKey> {
    private readonly authService = new AuthService();
    private readonly userService = new UserService();
    private readonly store = Store.getInstance();

    constructor(props: EditProfileFormProps) {
        super(props, config, { label: 'Сохранить' }, (props) => blankTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>): Promise<void> {
        if (isErrorsEmpty(errors)) {
            const formData: UserDto = Object.entries(this.props.form).reduce(
                (acc, [key, value]) => {
                    acc[key as InputKey] = value.value as string;
                    return acc;
                },
                {} as Record<InputKey, string>,
            );

            await this.userService.editUser(formData);

            this.setProps({
                ...this.props,
                isError: '',
            });
        }
    }

    componentDidMount() {
        const getUser = async () => {
            if (!this.store.getState<AppStore>().user.user) {
                await this.authService.getUser();
            }
        };

        void getUser();
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                ${Object.values(config.formFields)
                    .map(
                        (field) => `
                            <div class="${styles.row}">
                                <div class="${styles.label}">${field.label}</div>
                                <div class="${styles.value}">
                                    {{{${field.component}}}}
                                </div>
                            </div>
                        `,
                    )
                    .join('')}
            </div>
            <div class="${styles.save}">
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

export default connect<AppStore, EditProfileFormProps>(mapStateToProps)(EditProfileForm);
