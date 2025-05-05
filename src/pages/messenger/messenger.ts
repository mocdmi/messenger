import { Sidebar, Popup } from '@components';
import { Block } from '@core';
import { connect } from '@helpers';
import Actions from './parts/actions';
import AddContactForm from './parts/addContactForm';
import MessageForm from './parts/messageForm';
import RemoveChatForm from './parts/removeChatForm';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';
import { ChatProps } from './types';
import { ChatsService } from '@services';
import { AppStore } from '@types';

class Messenger extends Block<ChatProps> {
    private readonly chatsService = new ChatsService();

    constructor(props: ChatProps) {
        super('div', props, {
            Sidebar: new Sidebar(props) as Block,
            PopupAddContact: new Popup({
                title: 'Добавить пользователя',
                Children: new AddContactForm() as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        showAddAction: false,
                    });
                },
            }) as Block,
            PopupRemoveContact: new Popup({
                title: 'Удалить пользователя',
                Children: new RemoveChatForm() as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        showRemoveAction: false,
                    });
                },
            }) as Block,
            MessageForm: new MessageForm() as Block,
            Actions: new Actions({
                showActions: props.showActions,
                showAddActionHandler: () => {
                    this.setProps({
                        ...props,
                        showAddAction: true,
                    });
                },
                showRemoveActionHandler: () => {
                    this.setProps({
                        ...props,
                        showAddAction: true,
                    });
                },
            }) as Block,
        });
    }

    componentDidMount() {
        this.chatsService.getChats();
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (oldProps !== newProps) {
            const chats = this.children.Sidebar as Block;

            if (chats) {
                chats.setProps({
                    chats: newProps.chats,
                });
            }

            return true;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.main}">
                <header class="${styles.header}">
                    <div class="${styles.info}">
                        <div class="${styles.avatar}"></div>
                        <h2 class="${styles.name}">Вадим</h2>
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
                {{#if showAddAction}}
                    {{{PopupAddContact}}}
                {{/if}}
                {{#if showRemoveAction}}
                    {{{PopupRemoveContact}}}
                {{/if}}
            </div>
        `;
    }
}

export default connect<AppStore, ChatProps>(mapStateToProps)(Messenger);
