import { Block, Store } from '@/core';
import { ChatsService } from '@/services';
import { SelectedChatState } from '@/store';
import styles from './styles.module.css';

interface ChatCardProps {
    id: number;
    title: string;
    avatar?: string;
    lastMessage?: string;
    lastMessageTime?: string;
    newMessagesNum?: number;
    createdBy: number;
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
                click: () => this.handleClick(),
            },
        });
    }

    private async handleClick() {
        this.store.set<SelectedChatState>('selectedChat', {
            isLoading: false,
            isError: '',
            chat: {
                id: this.props.id,
                title: this.props.title,
                avatar: this.props.avatar,
                createdBy: this.props.createdBy,
            },
            users: null,
            messages: null,
        });

        await this.chatsService.getChatUsers(this.props.id);
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.inner} {{#if active}}${styles.active}{{/if}}">
                {{#if avatar}}
                    <div class="${styles.avatarWrap}">
                        <div class="${styles.avatar}"></div>
                    </div>
                {{/if}}
                <h2 class="${styles.title}">{{title}}</h2>
                {{#if lastMessage}}<div class="${styles.lastMessage}">{{lastMessage}}</div>{{/if}}
                {{#if lastMessageTime}}<div class="${styles.date}">{{lastMessageTime}}</div>{{/if}}
                {{#if newMessagesNum}}<div class="${styles.newCount}">{{newMessagesNum}}</div>{{/if}}
            </div>

        `;
    }
}
