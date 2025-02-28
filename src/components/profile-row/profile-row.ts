import { Block } from '../../core';
import styles from './styles.module.css';

interface ProfileRowProps {
    label: string;
    value?: string;
    Children?: Block;
}

export default class ProfileRow extends Block<ProfileRowProps> {
    constructor(props: ProfileRowProps) {
        super(
            'div',
            {
                ...props,
                className: styles.row,
            },
            {
                ...(props.Children ? { Body: props.Children } : {}),
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.label}">{{label}}</div>
            <div class="${styles.value}">
                {{#if value}}
                    {{{value}}}
                {{/if}}
                {{#if Children}}
                    {{{Body}}}
                {{/if}}
            </div>
        `;
    }
}
