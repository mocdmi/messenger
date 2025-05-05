import { AppStore } from '@types';
import { ChatProps } from './types';

export default function mapStateToProps(state: AppStore): ChatProps {
    return {
        showActions: false,
        showAddAction: false,
        showRemoveAction: false,
        selectedChatName: state.selectedChat?.chat.title || '',
        chats: state.chats?.chats || [],
    };
}
