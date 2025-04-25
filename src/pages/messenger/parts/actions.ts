import { Button, Panel } from '@components';
import { Block } from '@core';
import styles from '../styles.module.css';

interface ActionsProps {
    showActions: boolean;
    handlerShowAddAction: () => void;
    handlerShowRemoveAction: () => void;
}

export default class Actions extends Block<ActionsProps> {
    constructor(props: ActionsProps) {
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
            }) as unknown as Block,
            ActionsPanel: new Panel({
                'inner-class': styles.actions,
                Children: [
                    new Button({
                        icon: 'add',
                        label: 'Добавить пользователя',
                        type: 'button',
                        onClick: props.handlerShowAddAction,
                    }),
                    new Button({
                        icon: 'remove',
                        label: 'Удалить пользователя',
                        type: 'button',
                        onClick: props.handlerShowRemoveAction,
                    }),
                ] as unknown as Block[],
            }) as unknown as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="{{#if showActions}}${styles.showActionsButtonActive}{{/if}}">
                {{{ShowActionsButton}}}
            </div>
            {{#if showActions}}
                <div class="${styles.actionsPopup}">
                    {{{ActionsPanel}}}
                </div>
            {{/if}}
        `;
    }
}
