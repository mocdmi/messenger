import { Store } from '@core';

export function initStore() {
    const store = Store.getInstance();

    store.set('user', {
        user: null,
        isLoading: false,
        error: null,
    });

    store.set('chats', {
        chats: null,
        isLoading: false,
        error: null,
    });

    store.set('selectedChat', {
        selectedChatId: null,
        isLoading: false,
        error: null,
        chat: null,
        users: null,
    });
}
