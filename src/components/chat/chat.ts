import { Block, Store } from '@core';
import styles from './styles.module.css';
import { Chat as ChatProps } from 'src/pages/messenger/types';
import { ChatsService } from '@services';

export default class Chat extends Block<ChatProps> {
    private readonly store = Store.getInstance();
    private readonly chatsService = new ChatsService();

    constructor(props: ChatProps) {
        super('section', {
            ...props,
            className: styles.card,
            events: {
                click: () => this.clickHandler(),
            },
        });
    }

    private async clickHandler() {
        this.store.set('selectedChat.chat', {
            id: this.props.id,
            title: this.props.title,
            date: this.props.date,
            newMessagesNum: this.props.newMessagesNum,
            avatar: this.props.avatar,
        });
        await this.chatsService.getChatUsers(this.props.id);
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
