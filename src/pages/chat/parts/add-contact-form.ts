import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface AddContactFormProps {
    formState: {
        login: string;
    };
}

export default class AddContactForm extends Block<AddContactFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    login: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        console.log(this.props.formState);
                    },
                },
            },
            {
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                login: el.value,
                            },
                        });
                    },
                }) as Block,
                AddButton: new Button({
                    'theme-default': true,
                    label: 'Добавить',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.actionField}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.actionSubmit}">
                {{{AddButton}}}
            </div>
        `;
    }
}
