import { Block } from '@/core';
import { ROUTER } from '@/const';
import { connect } from '@/helpers';
import { AppStore, Chat } from '@/store';
import { CreateChat, ChatCard, Link, Loading } from '@/components';
import SearchForm from './parts/searchForm';
import styles from './styles.module.css';

interface ChatProps {
    id: number;
    title: string;
    avatar?: string;
    lastMessage?: string;
    lastMessageTime?: string;
    newMessagesNum?: number;
    createdBy: number;
}

interface SidebarProps {
    chats?: Chat[];
    selectedChatId?: number;
    showAddAction?: boolean;
    isLoading?: boolean;
}

class Sidebar extends Block<SidebarProps> {
    constructor(props: SidebarProps) {
        super(
            'nav',
            {
                ...props,
                className: styles.sidebar,
            },
            {
                Chats: props.chats?.map((props: ChatProps) => new ChatCard(props)) as Block[],
                ProfileLink: new Link({
                    'theme-default': true,
                    label: 'Профиль',
                    to: ROUTER.settings,
                    modificator: styles.link,
                }) as Block,
                SearchForm: new SearchForm() as Block,
                CreateChat: new CreateChat({
                    isShowPopup: false,
                }),
                Loading: new Loading({
                    text: 'Загрузка списка чатов...',
                    modificator: styles.loading,
                }) as Block,
            },
        );
    }

    componentDidUpdate(oldProps: SidebarProps, newProps: SidebarProps): boolean {
        if (oldProps !== newProps) {
            if (newProps.chats) {
                this.children.Chats = newProps.chats.map(
                    (props) =>
                        new ChatCard({
                            ...props,
                            active: props.id === newProps.selectedChatId,
                        }),
                ) as Block[];

                return true;
            }
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
            {{#if isLoading}}{{#unless Chats}}{{{Loading}}}{{/unless}}{{/if}}
            <div class="${styles.chatsWrap}">
                {{#each Chats}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="${styles.createChat}">
                {{{CreateChat}}}
            </div>
        `;
    }
}

function mapStateToProps(state: AppStore): SidebarProps {
    return {
        chats: state.chats.chats ?? [],
        selectedChatId: state.selectedChat.chat?.id,
        isLoading: state.chats.isLoading,
    };
}

export default connect<AppStore, SidebarProps>(mapStateToProps)(Sidebar);
