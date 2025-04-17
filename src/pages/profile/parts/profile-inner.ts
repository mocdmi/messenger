import { Link } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class ProfileInner extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditLink: new Link({
                'theme-default': true,
                label: 'Изменить данные',
                href: '/edit-profile',
            }) as Block,
            EditPasswordLink: new Link({
                'theme-default': true,
                label: 'Изменить пароль',
                href: '/edit-password',
            }) as Block,
            LogoutLink: new Link({
                'theme-danger': true,
                label: 'Выйти',
                href: '#',
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                {{#each detail}}
                    <div class="${styles.row}">
                        <div class="${styles.label}">{{label}}</div>
                        <div class="${styles.value}">{{value}}</div>
                    </div>
                {{/each}}
            </div>
            <nav>
                <div class="${styles.row}">
                    {{{EditLink}}}
                </div>
                <div class="${styles.row}">
                    {{{EditPasswordLink}}}
                </div>
                <div class="${styles.row}">
                    {{{LogoutLink}}}
                </div>
            </nav>
        `;
    }
}
