import { Block, Router } from '../../core';
import { withRouter } from '../../helpers';
import { Indexed } from '../../types';
import { Link } from '../link';
import { ProfileAvatar } from '../profileAvatar';
import styles from './styles.module.css';

interface ProfileProps extends Indexed {
    name?: string;
    Children: Block | Block[];
    router?: Router;
}

class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super(
            'div',
            {
                ...props,
                className: styles.profile,
            },
            {
                Avatar: new ProfileAvatar(props) as unknown as Block,
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
                BackButton: new Link({
                    label: 'Back',
                    href: '/',
                    modificator: styles.backLink,
                    onClick: (e: Event) => {
                        e.preventDefault();
                        props.router?.back();
                    },
                }) as unknown as Block,
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

export default withRouter(Profile);
