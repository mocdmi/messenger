import { Button, LabelInput } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class EditForm extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
            },
            {
                PasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'oldPassword',
                    value: props.password,
                    required: true,
                }) as Block,
                NewPasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPassword',
                    value: '',
                    required: true,
                }) as Block,
                NewPasswordConfirmInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPasswordConfirm',
                    value: '',
                    required: true,
                }) as Block,
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    label: 'Сохранить',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                <div class="${styles.row}">
                    <div class="${styles.label}">Старый пароль</div>
                    <div class="${styles.value}">
                        {{{PasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Повторите новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordConfirmInput}}}
                    </div>
                </div>
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
