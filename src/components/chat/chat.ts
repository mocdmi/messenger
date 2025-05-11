import { Block } from '@/core';
import { ChatHeader, ChatActions } from '@/components';
import MessageForm from '@/pages/messenger/parts/messageForm';
import styles from './styles.module.css';

export default class Chat extends Block {
    constructor() {
        super(
            'div',
            {
                className: styles.chat,
            },
            {
                Actions: new ChatActions({}) as Block,
                ChatHeader: new ChatHeader({}) as Block,
                MessageForm: new MessageForm({}) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <header class="${styles.headerWrap}">
                {{{ChatHeader}}}
                {{{Actions}}}
            </header>
            <main class="${styles.messages}">
                <div class="${styles.noMessages}">Выберите чат, чтобы отправить сообщение</div>
            </main>
            <div class="${styles.messageFormWrap}">
                {{{MessageForm}}}
            </div>
        `;
    }
}
