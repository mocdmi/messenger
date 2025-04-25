import { Block } from '@core';
import { Indexed } from '@types';
import { Button } from '../button';
import { Popup } from '../popup';
import UploadForm from './parts/uploadForm';
import styles from './styles.module.css';
import noPhoto from '@assets/images/no-photo.svg';

interface ProfileAvatarProps extends Indexed {
    name?: string;
    popupShow?: boolean;
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
                    handlerHidePopup: () => {
                        this.setProps({
                            ...props,
                            popupShow: false,
                        });
                    },
                }) as unknown as Block,
                OpenPopupButton: new Button({
                    'theme-blank-light': true,
                    label: 'Поменять аватар',
                    type: 'submit',
                    onClick: () => {
                        this.setProps({
                            ...props,
                            popupShow: true,
                        });
                    },
                }) as unknown as Block,
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
            {{#if popupShow}}
                {{{UploadForm}}}
            {{/if}}
        `;
    }
}
