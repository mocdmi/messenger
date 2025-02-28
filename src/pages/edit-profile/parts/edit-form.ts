import { Button } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';
import FormRow from './form-row';

export default class EditForm extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
            },
            {
                FormRows: props.detail.map((props) => new FormRow(props)) as Block[],
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    label: 'Сохранить',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                {{#each FormRows}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
