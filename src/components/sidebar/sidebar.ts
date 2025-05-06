import { ROUTER } from '@const';
import { Block } from '@core';
import { Chat } from '../chat';
import { Link } from '../link';
import SearchForm from './parts/searchForm';
import styles from './styles.module.css';

interface ChatProps {
    id: number;
    title: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
}

interface MessengerProps {
    chats: ChatProps[];
}

export default class Sidebar extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        super(
            'nav',
            {
                ...props,
                className: styles.contacts,
            },
            {
                Chats: props.chats.map((props: ChatProps) => new Chat(props)) as Block[],
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

    componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        if (oldProps !== newProps) {
            this.children.Chats = newProps.chats.map(
                (props: ChatProps) => new Chat(props),
            ) as Block[];

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
