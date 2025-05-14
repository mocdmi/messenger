import { Block, WebSocketClient } from '@/core';
import { ChatHeader, ChatActions, SendMessageForm } from '@/components';
import { connect, isErrorsEmpty } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore } from '@/store';
import styles from './styles.module.css';

interface ChatProps {
    chatId?: number;
    userId?: number;
}

class Chat extends Block<ChatProps> {
    private wsClient: WebSocketClient | null = null;
    private readonly chatsService = new ChatsService();

    constructor() {
        super(
            'div',
            {
                className: styles.chat,
            },
            {
                Actions: new ChatActions({}) as Block,
                ChatHeader: new ChatHeader({}) as Block,
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

    sendMessage = (message: string) => {
        if (this.wsClient) {
            this.wsClient.send('message', message);
        } else {
            console.error('WebSocket client is not initialized');
        }
    };

    initWebsockets = async () => {
        if (!this.props.chatId) {
            throw new Error('Chat not found');
        }

        if (!this.props.userId) {
            throw new Error('User not found');
        }

        const token = await this.chatsService.getChatToken(this.props.chatId);

        this.wsClient = new WebSocketClient(
            `/chats/${this.props.userId}/${this.props.chatId}/${token}`,
        );

        this.wsClient.connect();

        this.wsClient.subscribe('message', (message) => {
            console.log('New message: ', message);
        });

        this.wsClient.subscribe('error', (error) => {
            console.error('WebSocket error: ', error);
        });
    };

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (oldProps.chatId !== newProps.chatId) {
            void this.initWebsockets();
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
                <div class="${styles.noChat}">Выберите чат, чтобы отправить сообщение</div>
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
    };
}

export default connect(mapStateToProps)(Chat);
