import { Block } from '@/core';
import { connect } from '@/helpers';
import { AppStore, ChatMessage } from '@/store';

interface MessagesProps {
    messages?: ChatMessage[] | null;
}

class Messages extends Block<MessagesProps> {
    constructor() {
        super('div', {
            messages: [],
        });
    }

    // language=Handlebars
    render(): string {
        return `
            {{messages}}
        `;
    }
}

function mapStateToProps(state: AppStore): MessagesProps {
    return {
        messages: state.selectedChat.messages,
    };
}

export default connect<AppStore, MessagesProps>(mapStateToProps)(Messages);
