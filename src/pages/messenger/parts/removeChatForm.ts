import { Button, LabelInput } from '@components';
import { Block, Store, Validator } from '@core';
import { isErrorsEmpty, validateOnSubmit } from '@helpers';
import styles from '../styles.module.css';
import { ChatsService } from '@services';
import { AppStore } from '@types';

interface RemoveChatFormProps {
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

// TODO: переписать на класс BaseForm
export default class RemoveChatForm extends Block<RemoveChatFormProps> {
    private readonly chatsService = new ChatsService();
    private readonly store = Store.getInstance();

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
                            const chatId = this.store.getState<AppStore>().selectedChat?.id;

                            if (chatId) {
                                this.chatsService.deleteUsersFromChat(chatId, [
                                    Number(this.props.formState.login),
                                ]);
                            }

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
                        const input = this.children.LoginInput as unknown as LabelInput;
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
                RemoveButton: new Button({
                    'theme-default': true,
                    label: 'Удалить',
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
                {{{RemoveButton}}}
            </div>
        `;
    }
}
