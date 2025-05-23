import { BaseForm } from '@/components';
import { blankTheme } from '@/components/baseForm';
import { Store } from '@/core';
import { isErrorsEmpty } from '@/helpers';
import { AuthService, UserService } from '@/services';
import { AppStore } from '@/store';
import { UpdateUserPasswordRequestDto } from '@/types';
import { config } from './config';
import { EditPasswordFormProps, InputKey } from './types';
import styles from './styles.module.css';

export default class EditPasswordForm extends BaseForm<EditPasswordFormProps, InputKey> {
    private readonly authService = new AuthService();
    private readonly userService = new UserService();
    private readonly store = Store.getInstance();

    constructor(props: EditPasswordFormProps) {
        super(props, config, { label: 'Сохранить' }, (props) => blankTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>): Promise<void> {
        if (isErrorsEmpty(errors)) {
            const formData: UpdateUserPasswordRequestDto = Object.entries(this.props.form).reduce(
                (acc, [key, value]) => {
                    acc[key as InputKey] = value.value as string;
                    return acc;
                },
                {} as Record<InputKey, string>,
            );

            await this.userService.editPassword(formData);

            super.resetForm();
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
        `;
    }
}
