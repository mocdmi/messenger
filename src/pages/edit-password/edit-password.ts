import { Button, LabelInput, Form, ProfileRow, Wrapper } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import { Profile } from '../../components/profile';
import styles from './styles.module.css';

export default class EditPasswordPage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditPassword: new Profile({
                Children: new Form({
                    action: '#',
                    method: 'POST',
                    Children: [
                        new Wrapper({
                            tagName: 'div',
                            className: styles.detail,
                            Children: [
                                new ProfileRow({
                                    label: 'Старый пароль',
                                    Children: new LabelInput({
                                        'theme-blank': true,
                                        'align-right': true,
                                        'placeholder-right': true,
                                        type: 'password',
                                        name: 'oldPassword',
                                        value: props.password,
                                        required: true,
                                    }) as Block,
                                }) as Block,
                                new ProfileRow({
                                    label: 'Новый пароль',
                                    Children: new LabelInput({
                                        'theme-blank': true,
                                        'align-right': true,
                                        'placeholder-right': true,
                                        type: 'password',
                                        name: 'newPassword',
                                        value: '',
                                        required: true,
                                    }) as Block,
                                }) as Block,
                                new ProfileRow({
                                    label: 'Повторите новый пароль',
                                    Children: new LabelInput({
                                        'theme-blank': true,
                                        'align-right': true,
                                        'placeholder-right': true,
                                        type: 'password',
                                        name: 'newPassword',
                                        value: '',
                                        required: true,
                                    }) as Block,
                                }) as Block,
                            ],
                        }) as Block,
                        new Wrapper({
                            tagName: 'div',
                            className: styles.save,
                            Children: new Button({
                                'theme-default': true,
                                label: 'Сохранить',
                                type: 'submit',
                            }) as Block,
                        }) as Block,
                    ],
                }) as Block,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{EditPassword}}}';
    }
}
