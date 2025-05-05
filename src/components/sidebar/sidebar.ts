import { ROUTER } from '@const';
import { Block } from '@core';
import { Chat } from '../chat';
import { Link } from '../link';
import SearchForm from './parts/searchForm';
import styles from './styles.module.css';
import { ChatProps, Chat as IChat } from 'src/pages/messenger/types';

export default class Sidebar extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super(
            'nav',
            {
                ...props,
                className: styles.contacts,
            },
            {
                Chats: props.chats.map((chat: IChat) => new Chat(chat)) as Block[],
                ProfileLink: new Link({
                    'theme-default': true,
                    label: 'Профиль',
                    to: ROUTER.settings,
                    modificator: styles.link,
                }) as Block,
                SearchForm: new SearchForm() as Block,
            },
        );
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (oldProps !== newProps) {
            this.children.Chats = newProps.chats.map((chat: IChat) => new Chat(chat)) as Block[];

            return true;
        }

        return false;
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
