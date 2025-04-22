import { Block } from '../../core';
import { Indexed } from '../../types';
import styles from './styles.module.css';

interface ContactCardProps extends Indexed {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export default class Chat extends Block<ContactCardProps> {
    constructor(props: ContactCardProps) {
        super('section', {
            ...props,
            className: styles.card,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.inner} {{#if active}}${styles.active}{{/if}}">
                <div class="${styles.avatarWrap}">
                    <div class="${styles.avatar}"></div>
                </div>
                <h2 class="${styles.name}">{{name}}</h2>
                <div class="${styles.lastMessage}">{{lastMessage}}</div>
                <div class="${styles.date}">{{date}}</div>
                {{#if newMessagesNum}}<div class="${styles.newCount}">{{newMessagesNum}}</div>{{/if}}
            </div>
        `;
    }
}
