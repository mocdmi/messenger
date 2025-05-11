import { Store } from '@/core';
import { AppStore } from './types/store';

export function initStore() {
    const store = Store.getInstance();

    store.createStore<AppStore>({
        user: {
            user: null,
            isLoading: false,
            error: null,
        },
        chats: {
            chats: null,
            isLoading: false,
            error: null,
        },
        selectedChat: {
            selectedChatId: null,
            isLoading: false,
            error: null,
            chat: null,
            users: null,
        },
    });
}
