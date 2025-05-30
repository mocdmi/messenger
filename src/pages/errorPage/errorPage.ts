import { Link } from '@/components';
import { Block } from '@/core';
import { ROUTER } from '@/const';
import styles from './styles.module.css';

interface ErrorPageProps {
    status: string;
    message: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super('div', props, {
            BackLink: new Link({
                'theme-default': true,
                label: 'Назад к чатам',
                to: ROUTER.messenger,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.error}">
                <h1 class="${styles.status}">404</h1>
                <div class="${styles.message}">Не туда попали</div>
                {{{BackLink}}}
            </main>
        `;
    }
}
