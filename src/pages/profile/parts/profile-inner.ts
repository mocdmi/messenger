import { ProfileProps } from '../../profile';
import { Link } from '../../../components';
import { ROUTER } from '../../../const';
import { Block } from '../../../core';
import { connect } from '../../../helpers';
import { AppStore } from '../../../types';
import styles from '../styles.module.css';

class ProfileInner extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super('div', props, {
            EditLink: new Link({
                'theme-default': true,
                label: 'Изменить данные',
                to: ROUTER.editProfile,
            }) as unknown as Block,
            EditPasswordLink: new Link({
                'theme-default': true,
                label: 'Изменить пароль',
                to: ROUTER.editPassword,
            }) as unknown as Block,
            LogoutLink: new Link({
                'theme-danger': true,
                label: 'Выйти',
                to: '#',
            }) as unknown as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                {{#each items}}
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

export default connect<AppStore, ProfileProps>((state) => {
    return {
        items: [
            {
                label: 'Почта',
                value: state.user?.email,
            },
            {
                label: 'Логин',
                value: state.user?.login,
            },
            {
                label: 'Имя',
                value: state.user?.first_name,
            },
            {
                label: 'Фамилия',
                value: state.user?.second_name,
            },
            {
                label: 'Имя в чате',
                value: state.user?.display_name,
            },
            {
                label: 'Телефон',
                value: state.user?.phone,
            },
        ],
    };
})(ProfileInner);
