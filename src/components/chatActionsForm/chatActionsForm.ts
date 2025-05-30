import { BaseForm } from '@/components';
import { defaultTheme } from '@/components/baseForm';
import { UserService } from '@/services';
import { AppStore } from '@/store';
import { ChatActionsFormProps, InputKey } from './types';
import { config } from './config';
import { connect, isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';

class ChatActionsForm extends BaseForm<ChatActionsFormProps, InputKey> {
    private readonly userService = new UserService();

    constructor(props: ChatActionsFormProps) {
        super(props, config, { label: props.buttonTitle ?? 'Отправить' }, (props) =>
            defaultTheme(props),
        );
    }

    async onSubmit(_e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const searchUsers = await this.userService.searchUser(this.props.form.login.value);
            const user = searchUsers.filter(
                (user) => user.login === this.props.form.login.value,
            )[0];

            if (!user) {
                this.setProps({
                    ...this.props,
                    isError: 'Пользователь не найден',
                });

                return;
            }

            this.props.onSubmit?.(Number(user.id));
            super.resetForm();
            this.setProps({
                ...this.props,
                isError: '',
            });
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

export default connect<AppStore, ChatActionsFormProps>(mapStateToProps)(ChatActionsForm);
