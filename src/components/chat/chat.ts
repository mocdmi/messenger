import { Block, Store, WebSocketClient } from '@/core';
import { ChatHeader, ChatActions, SendMessageForm, Messages } from '@/components';
import { connect, isErrorsEmpty } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore, ChatMessage } from '@/store';
import {
    GetMessageRequestDto,
    GetMessageResponseDto,
    GetOldMessagesResponseDto,
    OldMessageDto,
    WebsocketError,
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

    constructor() {
        super(
            'div',
            {
                className: styles.chat,
            },
            {
                Actions: new ChatActions({}) as Block,
                ChatHeader: new ChatHeader({}) as Block,
                Messages: new Messages({}) as Block,
                MessageForm: new SendMessageForm({
                    onSubmit: (e: Event, message: string, errors) =>
                        this.handlerSubmitMessage(e, message, errors),
                }) as Block,
            },
        );
    }

    private handlerSubmitMessage(e: Event, message: string, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            this.sendMessage(message);
            (e.target as HTMLFormElement).reset();
        }
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

    private messageAdapter = (message: GetMessageResponseDto | OldMessageDto): ChatMessage => {
        return {
            id: Number(message.id),
            message: message.content,
            userId: Number(message.user_id),
            time: new Date(message.time).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            date: new Date(message.time).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            timestamp: new Date(message.time).getTime(),
        };
    };

    private getMessages() {
        if (this.webSocketNotInitialized()) return;

        this.wsClient!.subscribe<GetOldMessagesResponseDto | GetMessageResponseDto>(
            'message',
            (content) => {
                let messages: ChatMessage[];

                if (Array.isArray(content)) {
                    messages = content.map((message) => {
                        return this.messageAdapter(message);
                    });
                } else {
                    messages = [...(this.props.messages ?? []), this.messageAdapter(content)];
                }

                const sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
                this.store.set('selectedChat.messages', sortedMessages);
            },
        );
    }

    private async initWebSocket() {
        if (!this.props.chatId) {
            throw new Error('Chat not found');
        }

        if (!this.props.userId) {
            throw new Error('User not found');
        }

        this.wsClient = await this.chatsService.chatWsConnect(this.props.chatId, this.props.userId);

        void this.getMessages();

        this.wsClient.send('get old', '0');

        this.wsClient.subscribe<WebsocketError>('error', (error) => {
            console.error('WebSocket error: ', error);
        });
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (oldProps.chatId !== newProps.chatId) {
            this.store.set('selectedChat.messages', null);
            void this.initWebSocket();
            return true;
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
