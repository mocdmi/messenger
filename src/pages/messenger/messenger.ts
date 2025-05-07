import { Sidebar } from '@components';
import { Block } from '@core';
import { connect } from '@helpers';
import Actions from './parts/actions';
import MessageForm from './parts/messageForm';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';
import { MessengerProps } from './types';
import { ChatsService } from '@services';
import { AppStore } from '@types';

class Messenger extends Block<MessengerProps> {
    private readonly chatsService = new ChatsService();

    constructor(props: MessengerProps) {
        super('div', props, {
            Sidebar: new Sidebar(props) as Block,
            MessageForm: new MessageForm() as Block,
            Actions: new Actions() as Block,
        });
    }

    componentDidMount() {
        this.chatsService.getChats();
    }

    componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        if (oldProps.chats !== newProps.chats) {
            const chats = this.children.Sidebar as Block;

            if (chats) {
                chats.setProps({
                    chats: newProps.chats,
                });
            }
        }

        return true;
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.main}">
                <header class="${styles.header}">
                    <div class="${styles.info}">
                        {{#if selectedChatName}}
                        <div class="${styles.avatar}"></div>
                        {{/if}}
                        <h2 class="${styles.name}">{{selectedChatName}}</h2>
                    </div>
                    {{{Actions}}}
                </header>
                <main class="${styles.chat}">
                    <div class="${styles.noMessages}">Выберите чат, чтобы отправить сообщение</div>
                </main>
                <div class="${styles.sidebar}">
                    {{{Sidebar}}}
                </div>
                {{{MessageForm}}}
            </div>
        `;
    }
}

export default connect<AppStore, MessengerProps>(mapStateToProps)(Messenger);
