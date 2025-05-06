import { Sidebar, Popup } from '@components';
import { Block, Store } from '@core';
import { connect } from '@helpers';
import Actions from './parts/actions';
import AddUserForm from './parts/addUserForm';
import MessageForm from './parts/messageForm';
import RemoveChatForm from './parts/removeUserForm';
import styles from './styles.module.css';
import mapStateToProps from './mapStateToProps';
import { MessengerProps } from './types';
import { ChatsService } from '@services';
import { AppStore } from '@types';

class Messenger extends Block<MessengerProps> {
    private readonly chatsService = new ChatsService();
    private readonly store = Store.getInstance();

    constructor(props: MessengerProps) {
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
                Children: new RemoveChatForm({
                    onSubmit: (userId: number) => this.removeUserToChatHandler(userId),
                }) as Block,
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

                    this.store.set('selectedChat.isError', '');
                },
                showRemoveActionHandler: () => {
                    this.setProps({
                        ...props,
                        showRemoveAction: true,
                    });

                    this.store.set('selectedChat.isError', '');
                },
            }) as Block,
        });
    }

    componentDidMount() {
        this.chatsService.getChats();
    }

    componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
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

    private addUserToChatHandler = async (userId: number) => {
        if (this.props.selectedChatId) {
            try {
                await this.chatsService.addUsersToChat(this.props.selectedChatId, [userId]);
                await this.chatsService.getChatUsers(this.props.selectedChatId);

                this.setProps({
                    ...this.props,
                    showAddAction: false,
                });
            } catch (error) {
                this.store.set('selectedChat.isError', (error as Error).message);
            }
        } else {
            this.store.set('selectedChat.isError', 'Выберите чат');
        }
    };

    private removeUserToChatHandler = async (userId: number) => {
        if (this.props.selectedChatId) {
            try {
                await this.chatsService.deleteUsersFromChat(this.props.selectedChatId, [userId]);
                await this.chatsService.getChatUsers(this.props.selectedChatId);

                this.setProps({
                    ...this.props,
                    showRemoveAction: false,
                });
            } catch (error) {
                this.store.set('selectedChat.isError', (error as Error).message);
            }
        } else {
            this.store.set('selectedChat.isError', 'Выберите чат');
        }
    };

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

export default connect<AppStore, MessengerProps>(mapStateToProps)(Messenger);
