import { ROUTER } from '../../const';
import { ChatContext, IChat } from '../../context/types/ChatContext';
import { Block } from '../../core';
import { Chat } from '../chat';
import { Link } from '../link';
import SearchForm from './parts/search-form';
import styles from './styles.module.css';

export default class Sidebar extends Block<ChatContext> {
    constructor(props: ChatContext) {
        super(
            'nav',
            {
                ...props,
                className: styles.contacts,
            },
            {
                Chats: props.chats.map((contact: IChat) => {
                    return new Chat(contact) as unknown as Block;
                }),
                ProfileLink: new Link({
                    'theme-default': true,
                    label: 'Профиль',
                    to: ROUTER.settings,
                    modificator: styles.link,
                }) as unknown as Block,
                SearchForm: new SearchForm() as unknown as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.linkWrap}">
                {{{ProfileLink}}}
            </div>
            {{{SearchForm}}}
            <div>
                {{#each Chats}}
                    {{{this}}}
                {{/each}}
            </div>
        `;
    }
}
