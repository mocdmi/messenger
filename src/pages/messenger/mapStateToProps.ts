import { AppStore } from '@types';
import { MessengerProps } from './types';

export default function mapStateToProps(state: AppStore): MessengerProps {
    return {
        selectedChatName: state.selectedChat?.chat?.title || '',
        selectedChatAvatar: state.selectedChat?.chat?.avatar || '',
        chats: state.chats?.chats || [],
    };
}
