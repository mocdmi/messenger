import { Block, Store } from '@/core';
import { Button, Panel, Popup, ChatUsersActionsForm } from '@/components';
import { connect } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore } from '@/store';
import styles from './styles.module.css';

interface ChatUsersActionsProps {
    isShowActionsPanel?: boolean;
    isShowAddPopup?: boolean;
    isShowRemovePopup?: boolean;
    chatId?: number;
}

class ChatUsersActions extends Block<ChatUsersActionsProps> {
    private readonly store = Store.getInstance();
    private readonly chatsService = new ChatsService();

    constructor(props: ChatUsersActionsProps) {
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
                ] as Block[],
            }) as Block,
            PopupAddUser: new Popup({
                title: 'Добавить пользователя',
                Children: new ChatUsersActionsForm({
                    buttonTitle: 'Добавить',
                    onSubmit: (userId: number) => this.addUserToChatHandler(userId),
                }) as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        isShowAddPopup: false,
                    });
                },
            }) as Block,
            PopupRemoveContact: new Popup({
                title: 'Удалить пользователя',
                Children: new ChatUsersActionsForm({
                    buttonTitle: 'Удалить',
                    onSubmit: (userId: number) => this.removeUserToChatHandler(userId),
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

    private addUserToChatHandler = async (userId: number) => {
        if (this.props.chatId) {
            try {
                await this.chatsService.addUsersToChat(this.props.chatId, [userId]);
                await this.chatsService.getChatUsers(this.props.chatId);

                this.setProps({
                    ...this.props,
                    isShowAddPopup: false,
                });
            } catch (error) {
                this.store.set('selectedChat.isError', (error as Error).message);
            }
        } else {
            this.store.set('selectedChat.isError', 'Выберите чат');
        }
    };

    private removeUserToChatHandler = async (userId: number) => {
        if (this.props.chatId) {
            try {
                await this.chatsService.deleteUsersFromChat(this.props.chatId, [userId]);
                await this.chatsService.getChatUsers(this.props.chatId);

                this.setProps({
                    ...this.props,
                    isShowRemovePopup: false,
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
                {{{PopupRemoveContact}}}
            {{/if}}
        `;
    }
}

function mapStateToProps(state: AppStore): ChatUsersActionsProps {
    return {
        chatId: state.selectedChat.chat?.id,
    };
}

export default connect<AppStore, ChatUsersActionsProps>(mapStateToProps)(ChatUsersActions);
