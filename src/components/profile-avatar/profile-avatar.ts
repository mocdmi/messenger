import { Block } from '../../core';
import { Button } from '../button';
import { Popup } from '../popup';
import UploadForm from './parts/upload-form';
import styles from './styles.module.css';
import noPhoto from '../../assets/images/no-photo.svg';

interface ProfileAvatarProps {
    name?: string;
}

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
    constructor(props: ProfileAvatarProps) {
        super(
            'div',
            {
                ...props,
                className: styles.avatar,
            },
            {
                UploadForm: new Popup({
                    title: 'Загрузите файл',
                    Children: new UploadForm() as Block,
                }) as Block,
                OpenPopupButton: new Button({
                    'theme-blank-light': true,
                    label: 'Поменять аватар',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.photoWrap}">
                <img src="${noPhoto}" class="${styles.photo}" alt="{{name}}" />
                <div class="${styles.editAvatar}">
                    {{{OpenPopupButton}}}
                </div>
            </div>
            {{#if name}}<h2 class="${styles.name}">{{name}}</h2>{{/if}}
            {{{UploadForm}}}
        `;
    }
}
