import { Block, Store } from '@/core';
import { Button, Panel, Popup, ChatActionsForm } from '@/components';
import { connect } from '@/helpers';
import { ChatsService } from '@/services';
import { AppStore } from '@/store';
import styles from './styles.module.css';

interface ChatActionsProps {
    showActions?: boolean;
    showAddAction?: boolean;
    showRemoveAction?: boolean;
    chatId?: number;
}

class ChatActions extends Block<ChatActionsProps> {
    private readonly store = Store.getInstance();
    private readonly chatsService = new ChatsService();

    constructor() {
        const props: ChatActionsProps = {
            showActions: false,
            showAddAction: false,
            showRemoveAction: false,
        };

        super('div', props, {
            ShowActionsButton: new Button({
                'theme-blank': true,
                rounded: true,
                icon: 'settings',
                type: 'button',
                onClick: () => {
                    this.setProps({
                        ...props,
                        showActions: !this.props.showActions,
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
                                showActions: false,
                                showAddAction: true,
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
                                showActions: false,
                                showRemoveAction: true,
                            });
                        },
                    }),
                ] as Block[],
            }) as Block,
            PopupAddUser: new Popup({
                title: 'Добавить пользователя',
                Children: new ChatActionsForm({
                    buttonTitle: 'Добавить',
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
                Children: new ChatActionsForm({
                    buttonTitle: 'Удалить',
                    onSubmit: (userId: number) => this.removeUserToChatHandler(userId),
                }) as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        showRemoveAction: false,
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
        if (this.props.chatId) {
            try {
                await this.chatsService.deleteUsersFromChat(this.props.chatId, [userId]);
                await this.chatsService.getChatUsers(this.props.chatId);

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
            <div class="{{#if showActions}}${styles.buttonActive}{{/if}}">
                {{{ShowActionsButton}}}
            </div>
            {{#if showActions}}
                <div class="${styles.popup}">
                    {{{ActionsPanel}}}
                </div>
            {{/if}}
            {{#if showAddAction}}
                {{{PopupAddUser}}}
            {{/if}}
            {{#if showRemoveAction}}
                {{{PopupRemoveContact}}}
            {{/if}}
        `;
    }
}

function mapStateToProps(state: AppStore): ChatActionsProps {
    return {
        chatId: state.selectedChat.chat?.id,
    };
}

export default connect<AppStore, ChatActionsProps>(mapStateToProps)(ChatActions);
