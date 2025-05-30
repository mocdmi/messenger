import { WEB_SOCKET_URL } from '@/const';
import { EventBus } from '@/core';
import { WebSocketEvents } from '@/types';

type Queue<TRequest = object> = { type: string; content: TRequest };
type QueueArray<TRequest = object> = Array<Queue<TRequest>>;

export default class WebSocketClient<TRequest = object> {
    private readonly url: string;
    private socket: WebSocket | null = null;
    private isConnected: boolean = false;
    private eventBus: EventBus = new EventBus();
    private messagesQueue: QueueArray = [];
    reconnectInterval: number = 3000;
    maxReconnectAttempts: number = 5;
    reconnectAttempts: number = 0;
    autoReconnect: boolean = true;

    constructor(url: string) {
        this.url = `${WEB_SOCKET_URL}/${url}`;
    }

    connect() {
        try {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.sendMessagesQueue();
                this.eventBus.emit('open');
            };

            this.socket.onmessage = (event: MessageEvent) => {
                try {
                    const data = JSON.parse(event.data);

                    const type: string = data.type ? data.type : 'message';

                    if (!type) {
                        throw new Error('Event type is not defined');
                    }

                    this.eventBus.emit(type, data);
                } catch (error: unknown) {
                    this.eventBus.emit(WebSocketEvents.Error, {
                        type: 'message',
                        message: (error as Error).message,
                    });
                }
            };

            this.socket.onerror = () => {
                this.eventBus.emit(WebSocketEvents.Error, {
                    type: 'connection',
                    message: 'An error occurred in the WebSocket connection.',
                });
            };

            this.socket.onclose = (event: CloseEvent) => {
                this.isConnected = false;

                if (event.wasClean) {
                    this.eventBus.emit(WebSocketEvents.Warning, {
                        type: 'closed',
                        message: 'Connection closed cleanly',
                    });
                } else {
                    this.eventBus.emit(WebSocketEvents.Error, {
                        type: 'closed',
                        message: `Connection closed with error: ${event.code} ${event.reason}`,
                    });
                }

                if (this.autoReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.reconnectAttempts++;

                    setTimeout(() => {
                        this.connect();
                    }, this.reconnectInterval);
                } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                    this.eventBus.emit(WebSocketEvents.Error, {
                        type: 'reconnect',
                        message: 'Max reconnect attempts reached',
                    });
                }
            };
        } catch (error: unknown) {
            this.eventBus.emit(WebSocketEvents.Error, {
                type: 'initialisation',
                message: (error as Error).message,
            });
        }
    }

    private sendMessagesQueue() {
        while (this.messagesQueue.length > 0 && this.isConnected) {
            const { type, content } = this.messagesQueue.shift() as Queue<TRequest>;
            this.send(type, content);
        }
    }

    send(type: string, content: TRequest) {
        if (this.socket && this.isConnected) {
            try {
                const message = JSON.stringify({ content, type });
                this.socket.send(message);
            } catch (error: unknown) {
                this.eventBus.emit(WebSocketEvents.Error, {
                    type: 'send',
                    message: (error as Error).message,
                });
            }
        } else {
            (this.messagesQueue as QueueArray<TRequest>).push({ type, content });
            this.eventBus.emit(WebSocketEvents.Error, {
                type: 'send',
                message: 'WebSocket is not connected. Cannot send message.',
            });
        }
    }

    subscribe<TResponse = string>(type: string, callback: (content: TResponse) => void) {
        this.eventBus.on(type, callback);
    }

    unsubscribe<TResponse = string>(type: string, callback: (content: TResponse) => void) {
        this.eventBus.off(type, callback);
    }

    close() {
        this.autoReconnect = false;

        if (this.socket) {
            this.socket.close();
        }
    }
}
