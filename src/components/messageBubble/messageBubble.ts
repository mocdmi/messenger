import { Block } from '@/core';
import styles from './styles.module.css';

interface MessageBubbleProps {
    type: 'incoming' | 'outgoing';
    content: string;
    time: string;
}

export default class MessageBubble extends Block<MessageBubbleProps> {
    constructor(props: MessageBubbleProps) {
        super('div', {
            ...props,
            className: `
                ${styles.messageBubble}
                ${styles[props.type]}
            `,
        });
    }

    render() {
        return `
            {{{content}}}
            <div class="${styles.time}">
                {{{time}}}
            </div>
        `;
    }
}
