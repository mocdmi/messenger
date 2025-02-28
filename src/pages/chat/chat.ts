import { Button, Contacts, Panel, Popup } from '../../components';
import { ChatContext } from '../../context/types/ChatContext';
import { Block } from '../../core';
import Actions from './parts/actions';
import AddContactForm from './parts/add-contact-form';
import MessageForm from './parts/message-form';
import RemoveContactForm from './parts/remove-contact-form';
import styles from './styles.module.css';

export default class Chat extends Block<ChatContext> {
    constructor(props: ChatContext) {
        super('div', props, {
            ShowActionsButton: new Button({
                'theme-blank': true,
                rounded: true,
                active: props.showActions,
                icon: 'settings',
                type: 'button',
            }) as Block,
            ActionsPanel: new Panel({
                Children: new Actions() as Block,
            }) as Block,
            Contacts: new Contacts(props) as Block,
            PopupAddContact: new Popup({
                title: 'Добавить пользователя',
                active: props.showAddAction,
                Children: new AddContactForm() as Block,
            }) as Block,
            PopupRemoveContact: new Popup({
                title: 'Удалить пользователя',
                active: props.showRemoveAction,
                Children: new RemoveContactForm() as Block,
            }) as Block,
            MessageForm: new MessageForm(),
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
                    {{{ShowActionsButton}}}
                    {{#if showActions}}
                        <div class="${styles.actionsPopup}">
                            {{{ActionsPanel}}}
                        </div>
                    {{/if}}
                </header>
                <main class="${styles.chat}">
                    <div class="${styles.noMessages}">Выберите чат, чтобы отправить сообщение</div>
                </main>
                <div class="${styles.contacts}">
                    {{{Contacts}}}
                </div>
                {{{MessageForm}}}
                {{{PopupAddContact}}}
                {{{PopupRemoveContact}}}
            </div>
        `;
    }
}
