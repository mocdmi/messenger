import { AppStore } from '@types';
import { MessengerProps } from './types';

export default function mapStateToProps(state: AppStore): MessengerProps {
    return {
        showActions: false,
        showAddAction: false,
        showRemoveAction: false,
        selectedChatName: state.selectedChat?.chat?.title || '',
        selectedChatId: state.selectedChat?.chat?.id || 0,
        selectedChatAvatar: state.selectedChat?.chat?.avatar || '',
        chats: state.chats?.chats || [],
    };
}
