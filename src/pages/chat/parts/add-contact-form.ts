import { Button, LabelInput } from '../../../components';
import { Block, Validator } from '../../../core';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
import styles from '../styles.module.css';

interface AddContactFormProps {
    formState: {
        login: string;
    };
    errors: {
        login: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isRequired(),
];

export default class AddContactForm extends Block<AddContactFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    login: '',
                },
                errors: {
                    login: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        const el = e.target as HTMLFormElement;

                        validateOnSubmit(
                            validators,
                            this.props.formState,
                            this.props.errors,
                            this.children,
                            (name: string, error: string) => {
                                this.setProps({
                                    ...this.props,
                                    errors: {
                                        ...this.props.errors,
                                        [name]: error,
                                    },
                                });
                            },
                        );

                        if (isErrorsEmpty(this.props.errors)) {
                            console.log(this.props.formState);
                            el.reset();
                        }
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
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                login: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.LoginInput as LabelInput;
                        const error = Validator.validate(el.value).isRequired();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                login: error,
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
