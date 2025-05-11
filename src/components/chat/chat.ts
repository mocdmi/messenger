import { Block } from '@/core';
import { ChatActions } from '@/components';
import MessageForm from '@/pages/messenger/parts/messageForm';
import SelectedChatInfo from '@/pages/messenger/parts/selectedChatInfo';
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
                SelectedChatInfo: new SelectedChatInfo({}) as Block,
                MessageForm: new MessageForm({}) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.actions}">
                {{{SelectedChatInfo}}}
                {{{Actions}}}
            </div>
            <main class="${styles.messages}">
                <div class="${styles.noMessages}">Выберите чат, чтобы отправить сообщение</div>
            </main>
            <div class="${styles.messageFormWrap}">
                {{{MessageForm}}}
            </div>
        `;
    }
}
