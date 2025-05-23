import { BaseForm } from '@/components';
import { messageFormTheme } from '@/components/baseForm';
import { isErrorsEmpty } from '@/helpers';
import { config } from './config';
import { InputKey, SendMessageFormProps } from './types';
import styles from './styles.module.css';

export default class SendMessageForm extends BaseForm<SendMessageFormProps, InputKey> {
    constructor(props: SendMessageFormProps) {
        super(props, config, { label: '' }, (props) => messageFormTheme(props));
    }

    async onSubmit(_e: Event, errors: Record<string, string>): Promise<void> {
        if (isErrorsEmpty(errors)) {
            this.props.onSubmit?.(this.props.form.message.value);
            super.resetForm();
        }
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.input}">
                {{{${config.formFields.message.component}}}}
            </div>
            <div class="${styles.button}">
                {{{SubmitButton}}}
            </div>
        `;
    }
}
