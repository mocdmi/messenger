import { Block } from '../../core';
import { Button } from '../button';
import { ProfileAvatar } from '../profile-avatar';
import styles from './styles.module.css';

interface ProfileProps {
    name?: string;
    Children: Block | Block[];
}

export default class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super(
            'div',
            {
                ...props,
                className: styles.profile,
            },
            {
                Avatar: new ProfileAvatar(props) as Block,
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
                BackButton: new Button({
                    'theme-default': true,
                    rounded: true,
                    icon: 'prev',
                    type: 'button',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.inner}">
                <div class="${styles.avatar}">
                    {{{Avatar}}}
                </div>
                {{#each Body}}
                    {{{this}}}
                {{/each}}
            </main>
            <div class="${styles.back}">
                {{{BackButton}}}
            </div>
        `;
    }
}
