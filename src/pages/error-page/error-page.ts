import { Link } from '../../components';
import { ErrorContext } from '../../context/types/ErrorContext';
import { Block } from '../../core';
import { PageNames } from '../../types/page-names';
import styles from './styles.module.css';

export default class ErrorPage extends Block<ErrorContext> {
    constructor(props: ErrorContext) {
        super('div', props, {
            BackLink: new Link({
                'theme-default': true,
                label: 'Назад к чатам',
                to: PageNames.CHAT,
            }) as unknown as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.error}">
                <h1 class="${styles.status}">{{status}}</h1>
                <div class="${styles.message}">{{message}}</div>
                {{{BackLink}}}
            </main>
        `;
    }
}
