import { Block, Store } from '@/core';
import { ChatsService } from '@/services';
import styles from './styles.module.css';

interface ChatCardProps {
    id: number;
    title: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export default class ChatCard extends Block<ChatCardProps> {
    private readonly store = Store.getInstance();
    private readonly chatsService = new ChatsService();

    constructor(props: ChatCardProps) {
        super('section', {
            ...props,
            className: styles.chatCard,
            events: {
                click: () => this.clickHandler(),
            },
        });
    }

    private clickHandler = async () => {
        this.store.set('selectedChat.chat', {
            id: this.props.id,
            title: this.props.title,
            date: this.props.date,
            newMessagesNum: this.props.newMessagesNum,
            avatar: this.props.avatar,
        });

        await this.chatsService.getChatUsers(this.props.id);
    };

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
