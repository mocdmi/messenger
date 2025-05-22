import { Block, Store } from '@/core';
import { ChatsService } from '@/services';
import styles from './styles.module.css';

interface ChatCardProps {
    id: number;
    title: string;
    avatar?: string;
    lastMessage?: string;
    lastMessageTime?: string;
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
                click: (e) => this.handleClick(e),
            },
        });
    }

    private async handleClick(e: Event) {
        const target = e.target as HTMLElement;

        if (target.classList.contains(styles.removeButton)) {
            try {
                await this.chatsService.deleteChat(this.props.id);
                await this.chatsService.getChats();

                this.store.set('selectedChat.chat', null);

                return;
            } catch (error) {
                console.error('Error deleting chat:', error);
            }
        }

        this.store.set('selectedChat.chat', {
            id: this.props.id,
            title: this.props.title,
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
                {{#if lastMessage}}<div class="${styles.lastMessage}">{{lastMessage}}</div>{{/if}}
                {{#if lastMessageTime}}<div class="${styles.date}">{{lastMessageTime}}</div>{{/if}}
                {{#if newMessagesNum}}<div class="${styles.newCount}">{{newMessagesNum}}</div>{{/if}}
                <button class="${styles.removeButton}" type="button">Удалить</button>
            </div>

        `;
    }
}
