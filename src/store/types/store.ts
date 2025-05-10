import { ChatsState } from './chats';
import { SelectedChatState } from './selectedChat';
import { UserState } from './user';

export interface AppStore {
    user: UserState;
    chats: ChatsState;
    selectedChat: SelectedChatState;
}
