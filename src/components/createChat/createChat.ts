import { CreateChatForm, Button, Popup } from '@/components';
import { Block } from '@/core';
import { ChatsService } from '@/services';

interface CreateChatProps {
    isShowPopup?: boolean;
}

export default class CreateChat extends Block<CreateChatProps> {
    private readonly chatsService = new ChatsService();

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
            await this.chatsService.getChats();

            this.setProps({
                ...this.props,
                isShowPopup: false,
            });
        } catch (error: unknown) {
            console.error('Error creating chat:', error);
        }
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
