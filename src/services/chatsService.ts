import { ChatsApi } from '@/api';
import { Store } from '@/core';
import { formatDate } from '@/helpers';
import { Chat, ChatUser } from '@/store';
import {
    AddUsersToChatRequestDto,
    ChatDto,
    ChatRequestDto,
    ChatUserDto,
    CreateChatRequestDto,
    DeleteChatRequestDto,
    DeleteUsersFromChatRequestDto,
    GetChatUsersRequestDto,
} from '@/types';

export class ChatsService {
    private readonly apiInstance = new ChatsApi();
    private readonly store = Store.getInstance();

    async getChats(data: ChatRequestDto = {}): Promise<void> {
        try {
            const { status, response } = await this.apiInstance.request(data);

            if (status !== 200) {
                throw new Error(`Error get chats. Status: ${status}`);
            }

            const chats = response.reduce((acc: Chat[], chat: ChatDto) => {
                acc.push({
                    id: chat.id,
                    title: chat.title,
                    lastMessage: chat.last_message?.content,
                    lastMessageTime: chat.last_message?.time
                        ? formatDate(chat.last_message.time)
                        : '',
                    newMessagesNum: chat.unread_count,
                    avatar: chat.avatar,
                });

                return acc;
            }, []);

            this.store.set('chats.chats', chats);
        } catch (error: unknown) {
            throw error;
        }
    }

    async createChat(title: string): Promise<void> {
        try {
            const data: CreateChatRequestDto = { title };
            const { status, response } = await this.apiInstance.create(data);

            if ('reason' in response) {
                throw new Error(response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error create chat. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw error;
        }
    }

    async deleteChat(chatId: number): Promise<void> {
        try {
            const data: DeleteChatRequestDto = { chatId };
            const { status } = await this.apiInstance.delete(data);

            if (status !== 200) {
                throw new Error(`Error delete chat. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw error;
        }
    }

    async addUsersToChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: AddUsersToChatRequestDto = {
                chatId,
                users: userIds,
            };

            const { status, response } = await this.apiInstance.addUsersToChat(data);

            if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error add users to chat. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async deleteUsersFromChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: DeleteUsersFromChatRequestDto = {
                chatId,
                users: userIds,
            };
            const { status, response } = await this.apiInstance.deleteUsersFromChat(data);

            if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error delete users from chat. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async getChatUsers(chatId: number): Promise<void> {
        try {
            const data: GetChatUsersRequestDto = { id: chatId };
            const { status, response } = await this.apiInstance.getChatUsers(data);

            if (status !== 200) {
                throw new Error(`Error get chat users. Status: ${status}`);
            }

            const users = response.reduce((acc: ChatUser[], user: ChatUserDto) => {
                acc.push({
                    id: user.id,
                    avatar: user.avatar,
                    first_name: user.first_name,
                });

                return acc;
            }, []);

            this.store.set('selectedChat.users', users);
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async getChatToken(chatId: number): Promise<string> {
        try {
            const { status, response } = await this.apiInstance.getChatToken(chatId);

            if (status !== 200) {
                throw new Error(`Error get chat token. Status: ${status}`);
            }

            return response.token;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async chatWsConnect(chatId: number, userId: number) {
        const token = await this.getChatToken(chatId);
        const wsClient = this.apiInstance.createChatWebSocket(chatId, userId, token);
        wsClient.connect();
        return wsClient;
    }
}
