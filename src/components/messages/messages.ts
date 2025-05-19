import { MessageBubble } from '@/components';
import { Block } from '@/core';
import { connect } from '@/helpers';
import { AppStore, ChatMessage } from '@/store';
import styles from './styles.module.css';

interface MessagesProps {
    messages?: ChatMessage[] | null;
    currentUserId?: number;
}

class Messages extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super(
            'div',
            {
                messages: [],
                className: styles.messages,
            },
            {
                Messages: props.messages?.map(
                    (item) =>
                        new MessageBubble({
                            type: props.currentUserId === item.userId ? 'incoming' : 'outgoing',
                            content: item.message,
                            time: item.time,
                        }),
                ) as Block[],
            },
        );
    }

    componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
        if (oldProps !== newProps) {
            if (newProps.messages) {
                this.children.Messages = newProps.messages?.map(
                    (props) =>
                        new MessageBubble({
                            type:
                                this.props.currentUserId === props.userId ? 'incoming' : 'outgoing',
                            content: props.message,
                            time: props.time,
                        }),
                ) as Block[];

                return true;
            }
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return `
            {{#each Messages}}
                {{{this}}}
            {{/each}}
        `;
    }
}

function mapStateToProps(state: AppStore): MessagesProps {
    return {
        messages: state.selectedChat.messages ?? [],
        currentUserId: state.user.user?.id,
    };
}

export default connect<AppStore, MessagesProps>(mapStateToProps)(Messages);
