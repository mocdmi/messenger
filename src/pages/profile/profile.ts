import { Link, Profile, ProfileRow, Wrapper } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import styles from './styles.module.css';

const links = [
    {
        label: 'Изменить данные',
        href: '#',
        theme: 'theme-default',
    },
    {
        label: 'Изменить пароль',
        href: '#',
        theme: 'theme-default',
    },
    {
        label: 'Выйти',
        href: '#',
        theme: 'theme-danger',
    },
];

export default class ProfilePage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            Profile: new Profile({
                Children: [
                    new Wrapper({
                        tagName: 'div',
                        className: styles.detail,
                        Children: props.detail.map((props) => {
                            return new ProfileRow(props);
                        }) as Block[],
                    }) as Block,
                    new Wrapper({
                        tagName: 'nav',
                        className: styles.save,
                        Children: links.map(({ label, href, theme }) => {
                            return new Wrapper({
                                tagName: 'div',
                                className: styles.row,
                                Children: new Link({
                                    [theme]: true,
                                    label,
                                    href,
                                }) as Block,
                            });
                        }) as Block[],
                    }) as Block,
                ],
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}
