import { Block } from '@core';
import styles from './styles.module.css';
import { Chat as IChat } from 'src/pages/messenger/types';

export default class Chat extends Block<IChat> {
    constructor(props: IChat) {
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
                <h2 class="${styles.title}">{{title}}</h2>
                <div class="${styles.lastMessage}">{{lastMessage}}</div>
                <div class="${styles.date}">{{date}}</div>
                {{#if newMessagesNum}}<div class="${styles.newCount}">{{newMessagesNum}}</div>{{/if}}
            </div>
        `;
    }
}
