import { Block, Store, WebSocketClient } from '@/core';
import { ChatHeader, ChatActions, SendMessageForm, Messages } from '@/components';
import { connect, isErrorsEmpty } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore, ChatMessage } from '@/store';
import {
    GetMessageRequestDto,
    GetMessageResponseDto,
    GetOldMessagesResponseDto,
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

    handlerSubmitMessage = (e: Event, message: string, errors: Record<string, string>) => {
        if (isErrorsEmpty(errors)) {
            this.sendMessage(message);
            (e.target as HTMLFormElement).reset();
        }
    };

    webSocketNotInitialized = () => {
        if (!this.wsClient) {
            console.error('WebSocket client is not initialized');
            return true;
        }

        return false;
    };

    sendMessage = (message: string) => {
        if (this.webSocketNotInitialized()) return;
        this.wsClient!.send('message', message);
    };

    getMessage = () => {
        if (this.webSocketNotInitialized()) return;

        this.wsClient!.subscribe<GetMessageResponseDto>('message', (content) => {
            const message = {
                id: content.id,
                message: content.content,
                userId: content.user_id,
            };

            this.store.set('selectedChat.messages', [...(this.props.messages ?? []), message]);
        });
    };

    getOldMessages = () => {
        if (this.webSocketNotInitialized()) return;

        this.wsClient!.send('get old', '0');
        this.wsClient!.subscribe<GetOldMessagesResponseDto>('get old', (content) => {
            const messages = content.map((message) => {
                return {
                    id: message.id,
                    message: message.content,
                    userId: message.user_id,
                };
            });

            this.store.set('selectedChat.messages', messages);
        });
    };

    initWebSocket = async () => {
        if (!this.props.chatId) {
            throw new Error('Chat not found');
        }

        if (!this.props.userId) {
            throw new Error('User not found');
        }

        this.wsClient = await this.chatsService.chatWsConnect(this.props.chatId, this.props.userId);
        void this.getOldMessages();
        void this.getMessage();

        this.wsClient.subscribe<WebsocketError>('error', (error) => {
            console.error('WebSocket error: ', error);
        });
    };

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
            <main class="${styles.messages}">
                <div class="${styles.noChat}">{{{Messages}}}</div>
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
