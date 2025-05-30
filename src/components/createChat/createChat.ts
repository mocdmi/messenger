import { CreateChatForm, Button, Popup } from '@/components';
import { initProps } from '@/components/createChatForm';
import { Block, Store } from '@/core';
import { ChatsService } from '@/services';

interface CreateChatProps {
    isShowPopup?: boolean;
}

export default class CreateChat extends Block<CreateChatProps> {
    private readonly chatsService = new ChatsService();
    private readonly store = Store.getInstance();

    constructor(props: CreateChatProps) {
        super('div', props, {
            Button: new Button({
                label: 'Добавить чат',
                'theme-default': true,
                type: 'submit',
                onClick: () => {
                    this.setProps({
                        ...props,
                        isShowPopup: true,
                    });
                },
            }) as Block,
            Popup: new Popup({
                title: 'Добавить чат',
                Children: new CreateChatForm({
                    ...initProps,
                    onSubmit: (chatName: string) => this.handleAddChatSubmit(chatName),
                }) as Block,
                hidePopupHandler: () => {
                    this.setProps({
                        ...props,
                        isShowPopup: false,
                    });
                },
            }) as Block,
        });
    }

    private async handleAddChatSubmit(chatName: string) {
        try {
            await this.chatsService.createChat(chatName);

            this.setProps({
                ...this.props,
                isShowPopup: false,
            });
        } catch {
            this.store.set<string>('selectedChat', 'Ошибка при создании чата');
        }

        await this.chatsService.getChats();
    }

    // language=Handlebars
    render(): string {
        return `
        {{{Button}}}
        {{#if isShowPopup}}
            {{{Popup}}}
        {{/if}}
        `;
    }
}
