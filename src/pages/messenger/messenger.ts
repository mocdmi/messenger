import { Sidebar, Popup } from '@components';
import { Block, Store } from '@core';
import { connect } from '@helpers';
import Actions from './parts/actions';
import AddUserForm from './parts/addUserForm';
import MessageForm from './parts/messageForm';
import RemoveChatForm from './parts/removeChatForm';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';
import { ChatProps } from './types';
import { ChatsService } from '@services';
import { AppStore } from '@types';

class Messenger extends Block<ChatProps> {
    private readonly chatsService = new ChatsService();
    private readonly store = Store.getInstance();

    constructor(props: ChatProps) {
        super('div', props, {
            Sidebar: new Sidebar(props) as Block,
            PopupAddUser: new Popup({
                title: 'Добавить пользователя',
                Children: new AddUserForm({
                    onSubmit: (userId: number) => this.addUserToChatHandler(userId),
                }) as Block,
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

    private async addUserToChatHandler(userId: number) {
        const chatId = this.store.getState<AppStore>().selectedChat?.chat?.id;

        if (chatId) {
            try {
                await this.chatsService.addUsersToChat(chatId, [userId]);
                await this.chatsService.getChatUsers(chatId);
            } catch (error) {
                this.store.set('selectedChat.isError', (error as Error).message);
            }
        }
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.main}">
                <header class="${styles.header}">
                    <div class="${styles.info}">
                        <div class="${styles.avatar}"></div>
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
                {{#if showAddAction}}
                    {{{PopupAddUser}}}
                {{/if}}
                {{#if showRemoveAction}}
                    {{{PopupRemoveContact}}}
                {{/if}}
            </div>
        `;
    }
}

export default connect<AppStore, ChatProps>(mapStateToProps)(Messenger);
