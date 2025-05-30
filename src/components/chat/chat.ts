import { initProps } from '@/components/sendMessageForm';
import { Block, Store, WebSocketClient } from '@/core';
import { ChatHeader, SendMessageForm, Messages, ChatActions } from '@/components';
import { connect, formatDate } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore, ChatMessage, SelectedChatState } from '@/store';
import {
    GetMessageRequestDto,
    GetMessageResponseDto,
    GetOldMessagesResponseDto,
    OldMessageDto,
    WebSocketEvents,
    WebsocketLog,
} from '@/types';
import styles from './styles.module.css';

interface ChatProps {
    chatId?: number;
    userId?: number;
    messages?: ChatMessage[] | null;
}

class Chat extends Block<ChatProps> {
    private wsClient: WebSocketClient<GetMessageRequestDto> | null = null;
    private readonly chatsService = new ChatsService();
    private readonly store = Store.getInstance();

    constructor(props: ChatProps) {
        super(
            'div',
            {
                ...props,
                className: styles.chat,
            },
            {
                Actions: new ChatActions({
                    isShowActionsPanel: false,
                    isShowAddPopup: false,
                    isShowRemovePopup: false,
                }) as Block,
                ChatHeader: new ChatHeader({
                    selectedChatTitle: '',
                    selectedChatAvatar: '',
                }) as Block,
                Messages: new Messages({
                    messages: [],
                }) as Block,
                MessageForm: new SendMessageForm({
                    ...initProps,
                    onSubmit: (message: string) => this.sendMessage(message),
                }) as Block,
            },
        );
    }

    private webSocketNotInitialized() {
        if (!this.wsClient) {
            console.error('WebSocket client is not initialized');
            return true;
        }

        return false;
    }

    private sendMessage(message: string) {
        if (this.webSocketNotInitialized()) return;
        this.wsClient!.send('message', message);
    }

    private messageAdapter = (message: GetMessageResponseDto | OldMessageDto): ChatMessage => ({
        id: Number(message.id),
        message: message.content,
        userId: Number(message.user_id),
        time: formatDate(message.time),
        timestamp: new Date(message.time).getTime(),
    });

    private onMessageCallback = (content: GetOldMessagesResponseDto | GetMessageResponseDto) => {
        let messages: ChatMessage[];

        if (Array.isArray(content)) {
            messages = content.map((message) => {
                return this.messageAdapter(message);
            });
        } else {
            messages = [...(this.props.messages ?? []), this.messageAdapter(content)];
        }

        const sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);

        this.store.set<SelectedChatState>('selectedChat', {
            ...this.store.getState<AppStore>().selectedChat,
            isLoading: false,
            messages: sortedMessages,
        });
    };

    private onErrorCallback = ({ type, message }: WebsocketLog) => {
        console.error(`${type}: ${message}`);
    };

    private onWarningCallback = ({ type, message }: WebsocketLog) => {
        console.warn(`${type}: ${message}`);
    };

    private async initWebSocket() {
        if (!this.props.chatId) {
            throw new Error('Chat not found');
        }

        if (!this.props.userId) {
            throw new Error('User not found');
        }

        this.store.set<boolean>('selectedChat.isLoading', true);

        this.wsClient = await this.chatsService.chatWsConnect(this.props.chatId, this.props.userId);

        this.wsClient.send('get old', '0');

        this.wsClient.subscribe('message', this.onMessageCallback);
        this.wsClient.subscribe(WebSocketEvents.Error, this.onErrorCallback);
        this.wsClient.subscribe(WebSocketEvents.Warning, this.onWarningCallback);
    }

    // TODO: Разобраться с закрытием сокета при переключении чата (возможно, не работает)
    private disconnectWebSocket(client: WebSocketClient<GetMessageRequestDto> | null) {
        if (client) {
            client.unsubscribe('message', this.onMessageCallback);
            client.unsubscribe(WebSocketEvents.Error, this.onErrorCallback);
            client.unsubscribe(WebSocketEvents.Warning, this.onWarningCallback);
            client.close();
        }
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (newProps.chatId && oldProps.chatId !== newProps.chatId) {
            this.disconnectWebSocket(this.wsClient);
            void this.initWebSocket();
            return true;
        }

        const messagesWrap = this.getContent().querySelector(`.${styles.messagesWrap}`);

        if (messagesWrap) {
            messagesWrap.scrollTop = messagesWrap.scrollHeight;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return `
            {{#if chatId}}
                <header class="${styles.headerWrap}">
                    {{{ChatHeader}}}
                    {{{Actions}}}
                </header>
                <main class="${styles.messagesWrap}">
                    {{{Messages}}}
                </main>
                <div class="${styles.messageFormWrap}">
                    {{{MessageForm}}}
                </div>
            {{else}}
                <div class="${styles.noChat}">Выберите чат, чтобы отправить сообщение</div>
            {{/if}}
        `;
    }
}

function mapStateToProps(state: AppStore): ChatProps {
    return {
        chatId: state.selectedChat.chat?.id,
        userId: state.user.user?.id,
        messages: state.selectedChat.messages,
    };
}

export default connect<AppStore, ChatProps>(mapStateToProps)(Chat);
