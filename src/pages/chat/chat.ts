import { Sidebar, Popup } from '../../components';
import { ChatContext } from '../../context/types/ChatContext';
import { Block } from '../../core';
import { Indexed } from '../../types';
import Actions from './parts/actions';
import AddContactForm from './parts/add-contact-form';
import MessageForm from './parts/message-form';
import RemoveContactForm from './parts/remove-contact-form';
import styles from './styles.module.css';

interface ChatProps extends ChatContext, Indexed {
    showActions: boolean;
    showAddAction: boolean;
    showRemoveAction: boolean;
}

export default class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super('div', props, {
            Sidebar: new Sidebar(props) as unknown as Block,
            PopupAddContact: new Popup({
                title: 'Добавить пользователя',
                Children: new AddContactForm() as unknown as Block,
                handlerHidePopup: () => {
                    this.setProps({
                        ...props,
                        showAddAction: false,
                    });
                },
            }) as unknown as Block,
            PopupRemoveContact: new Popup({
                title: 'Удалить пользователя',
                Children: new RemoveContactForm() as unknown as Block,
                handlerHidePopup: () => {
                    this.setProps({
                        ...props,
                        showRemoveAction: false,
                    });
                },
            }) as unknown as Block,
            MessageForm: new MessageForm() as unknown as Block,
            Actions: new Actions({
                showActions: props.showActions,
                handlerShowAddAction: () => {
                    this.setProps({
                        ...props,
                        showAddAction: true,
                    });
                },
                handlerShowRemoveAction: () => {
                    this.setProps({
                        ...props,
                        showAddAction: true,
                    });
                },
            }) as unknown as Block,
        });
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
