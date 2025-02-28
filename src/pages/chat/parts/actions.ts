import { Button } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class Actions extends Block {
    constructor() {
        super(
            'div',
            {
                className: styles.actions,
            },
            {
                AddButton: new Button({
                    icon: 'add',
                    label: 'Добавить пользователя',
                    type: 'button',
                }) as Block,
                RemoveButton: new Button({
                    icon: 'add',
                    label: 'Удалить пользователя',
                    type: 'button',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            {{{AddButton}}}
            {{{RemoveButton}}}
        `;
    }
}
