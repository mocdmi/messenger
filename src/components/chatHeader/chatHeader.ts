import { API_URL } from '@/const';
import { Block } from '@/core';
import { connect } from '@/helpers';
import { AppStore } from '@/store';
import styles from './styles.module.css';

interface ChatHeaderProps {
    selectedChatTitle?: string;
    selectedChatAvatar?: string;
}

class ChatHeader extends Block<ChatHeaderProps> {
    constructor(props: ChatHeaderProps) {
        super('div', props);
    }

    // language=Handlebars
    render() {
        return `
            <div class="${styles.selectedChatInfo}">
                {{#if selectedChatAvatar}}
                    <div class="${styles.avatar}">
                        <img src="${API_URL}/resources/{{selectedChatAvatar}}" alt="{{selectedChatTitle}}" class="${styles.avatarImage}" />
                    </div>
                {{/if}}
                <h2 class="${styles.title}">{{selectedChatTitle}}</h2>
            </div>
        `;
    }
}

function mapStateToProps(state: AppStore) {
    return {
        selectedChatTitle: state.selectedChat.chat?.title,
        selectedChatAvatar: state.selectedChat.chat?.avatar,
    };
}

export default connect<AppStore, ChatHeaderProps>(mapStateToProps)(ChatHeader);
