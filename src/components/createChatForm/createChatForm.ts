import { BaseForm } from '@/components';
import { defaultTheme } from '@/components/baseForm';
import { AppStore } from '@/store';
import mapStateToProps from './mapStateToProps';
import { CreateChatFormProps, InputKey } from './types';
import { config } from './config';
import { connect, isErrorsEmpty } from '@/helpers';
import styles from './styles.module.css';

class CreateChatForm extends BaseForm<CreateChatFormProps, InputKey> {
    constructor(props: CreateChatFormProps) {
        super(props, config, { label: 'Добавить чат' }, (props) => defaultTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const chatName = this.props.form.chatName.value;
            this.props.onSubmit?.(chatName);
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

export default connect<AppStore, CreateChatFormProps>(mapStateToProps)(CreateChatForm);
