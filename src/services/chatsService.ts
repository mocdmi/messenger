import {
    ChatsApi,
    ChatRequestDto,
    CreateChatRequestDto,
    DeleteChatRequestDto,
    AddUsersToChatRequestDto,
    DeleteUsersFromChatRequestDto,
    GetChatUsersRequestDto,
} from '@api';
import { Store } from '@core';
import { AppStore } from '@types';
import { Chat } from 'src/pages/messenger/types';

export default class ChatsService {
    private readonly apiInstance = new ChatsApi();
    private readonly store = Store.getInstance();

    constructor() {}

    async getChats(data: ChatRequestDto = {}): Promise<void> {
        if (this.store.getState<AppStore>().chats?.chats) {
            return;
        }

        try {
            const { status, response } = await this.apiInstance.request(data);

            if (status === 200) {
                const chats = response.reduce<Chat[]>((acc, chat) => {
                    acc.push({
                        id: chat.id,
                        title: chat.title,
                        lastMessage: chat.last_message?.content,
                        date: chat.last_message?.time,
                        newMessagesNum: chat.unread_count,
                        active: false,
                        avatar: chat.avatar,
                    });

                    return acc;
                }, []);

                this.store.set('chats.chats', chats);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async createChat(title: string): Promise<void> {
        try {
            const data: CreateChatRequestDto = { title };
            const { status, response } = await this.apiInstance.create(data);

            if (status === 200) {
                console.log(response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteChat(chatId: number): Promise<void> {
        try {
            const data: DeleteChatRequestDto = { chatId };
            const { status, response } = await this.apiInstance.delete(data);

            if (status === 200) {
                console.log(response);
            } else {
                throw new Error(`Error delete chat. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addUsersToChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: AddUsersToChatRequestDto = {
                chatId,
                users: userIds,
            };
            const { status, response } = await this.apiInstance.addUsersToChat(data);

            if (status === 200) {
                console.log(response);
            } else if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUsersFromChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: DeleteUsersFromChatRequestDto = {
                chatId,
                users: userIds,
            };
            const { status, response } = await this.apiInstance.deleteUsersFromChat(data);

            if (status === 200) {
                console.log(response);
            } else if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getChatUsers(chatId: number): Promise<void> {
        try {
            const data: GetChatUsersRequestDto = { id: chatId };
            const { status, response } = await this.apiInstance.getChatUsers(data);

            if (status === 200) {
                console.log(response);
            } else {
                throw new Error(`Error get chat users. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getChatToken(chatId: number): Promise<void> {
        try {
            const { status, response } = await this.apiInstance.getChatToken(chatId);

            if (status === 200) {
                console.log(response);
            } else {
                throw new Error(`Error get chat token. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
