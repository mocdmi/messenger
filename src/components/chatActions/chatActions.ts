import { initProps } from '@/components/chatActionsForm';
import { Block, Store } from '@/core';
import { Button, Panel, Popup, ChatActionsForm } from '@/components';
import { connect } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore, SelectedChatState } from '@/store';
import styles from './styles.module.css';

interface ChatActionsProps {
    isShowActionsPanel?: boolean;
    isShowAddPopup?: boolean;
    isShowRemovePopup?: boolean;
    chatId?: number;
    createdBy?: number;
    userId?: number;
}

// TODO: Убирать кнопки удалить пользователя и удалить чат, если пользователь не является создателем чата
class ChatActions extends Block<ChatActionsProps> {
    private readonly store = Store.getInstance();
    private readonly chatsService = new ChatsService();

    constructor(props: ChatActionsProps) {
        super('div', props, {
            ShowActionsButton: new Button({
                'theme-blank': true,
                rounded: true,
                icon: 'settings',
                type: 'button',
                onClick: () => {
                    this.setProps({
                        ...props,
                        isShowActionsPanel: !this.props.isShowActionsPanel,
                    });
                },
            }) as Block,
            ActionsPanel: new Panel({
                'inner-class': styles.actions,
                Children: [
                    new Button({
                        icon: 'add',
                        label: 'Добавить пользователя',
                        type: 'button',
                        onClick: () => {
                            this.setProps({
                                ...props,
                                isShowActionsPanel: false,
                                isShowAddPopup: true,
                            });
                        },
                    }),
                    new Button({
                        icon: 'remove',
                        label: 'Удалить пользователя',
                        type: 'button',
                        onClick: () => {
                            this.setProps({
                                ...props,
                                isShowActionsPanel: false,
                                isShowRemovePopup: true,
                            });
                        },
                    }),
                    new Button({
                        icon: 'remove',
                        label: 'Удалить чат',
                        type: 'button',
                        onClick: () => this.handleRemoveChat(),
                    }),
                ] as Block[],
            }) as Block,
            PopupAddUser: new Popup({
                title: 'Добавить пользователя',
                Children: new ChatActionsForm({
                    ...initProps,
                    buttonTitle: 'Добавить',
                    onSubmit: (userId: number) => this.handleAddUserToChat(userId),
                }) as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        isShowAddPopup: false,
                    });
                },
            }) as Block,
            PopupRemoveUser: new Popup({
                title: 'Удалить пользователя',
                Children: new ChatActionsForm({
                    ...initProps,
                    buttonTitle: 'Удалить',
                    onSubmit: (userId: number) => this.handleRemoveUserToChat(userId),
                }) as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        isShowRemovePopup: false,
                    });
                },
            }) as Block,
        });
    }

    private async handleAddUserToChat(userId: number) {
        if (!this.props.chatId) {
            throw new Error('Chat ID is not defined');
        }

        try {
            await this.chatsService.addUsersToChat(this.props.chatId, [userId]);

            this.setProps({
                ...this.props,
                isShowAddPopup: false,
            });
        } catch {
            this.store.set<string>(
                'selectedChat.isError',
                'Ошибка при добавлении пользователя в чат',
            );
        }

        await this.chatsService.getChatUsers(this.props.chatId);
    }

    private async handleRemoveUserToChat(userId: number) {
        if (!this.props.chatId) {
            throw new Error('Chat ID is not defined');
        }

        try {
            await this.chatsService.deleteUsersFromChat(this.props.chatId, [userId]);

            this.setProps({
                ...this.props,
                isShowRemovePopup: false,
            });
        } catch {
            this.store.set<string>(
                'selectedChat.isError',
                'Ошибка при удалении пользователя из чата',
            );
        }

        await this.chatsService.getChatUsers(this.props.chatId);
    }

    private async handleRemoveChat() {
        if (!this.props.chatId) {
            throw new Error('Chat ID is not defined');
        }

        await this.chatsService.deleteChat(this.props.chatId);
        await this.chatsService.getChats();

        this.setProps({
            ...this.props,
            isShowActionsPanel: false,
        });

        this.store.set<SelectedChatState>('selectedChat', {
            isLoading: false,
            isError: '',
            chat: null,
            users: null,
            messages: null,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="{{#if isShowActionsPanel}}${styles.buttonActive}{{/if}}">
                {{{ShowActionsButton}}}
            </div>
            {{#if isShowActionsPanel}}
                <div class="${styles.popup}">
                    {{{ActionsPanel}}}
                </div>
            {{/if}}
            {{#if isShowAddPopup}}
                {{{PopupAddUser}}}
            {{/if}}
            {{#if isShowRemovePopup}}
                {{{PopupRemoveUser}}}
            {{/if}}
        `;
    }
}

function mapStateToProps(state: AppStore): ChatActionsProps {
    return {
        chatId: state.selectedChat.chat?.id,
        createdBy: state.selectedChat.chat?.createdBy,
        userId: state.user.user?.id,
    };
}

export default connect<AppStore, ChatActionsProps>(mapStateToProps)(ChatActions);
