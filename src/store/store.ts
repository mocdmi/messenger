import { Store } from '@/core';
import { AppStore } from './types/store';

export function initStore() {
    const store = Store.getInstance();

    store.createStore<AppStore>({
        user: {
            user: null,
            isLoading: false,
            isError: '',
        },
        chats: {
            chats: null,
            isLoading: false,
            isError: '',
        },
        selectedChat: {
            isLoading: false,
            isError: '',
            chat: null,
            users: null,
            messages: null,
        },
    });
}
