import { BaseForm } from '@/components';
import { defaultTheme } from '@/components/baseForm';
import { AppStore } from '@/store';
import { ChatActionsFormProps, InputKey } from './types';
import { config } from './config';
import { connect, isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';

class ChatActionsForm extends BaseForm<ChatActionsFormProps, InputKey> {
    constructor(props: ChatActionsFormProps) {
        super(props, config, { label: props.buttonTitle ?? 'Отправить' }, (props) =>
            defaultTheme(props),
        );
    }

    async onSubmit(_e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const userId = this.props.form.login.value; // TODO: Переделать на поиск id пользователя по логину

            this.props.onSubmit?.(Number(userId));
            super.resetForm();
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
