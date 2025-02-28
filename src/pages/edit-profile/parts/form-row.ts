import { LabelInput } from '../../../components';
import { ProfileDetail } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';

export default class FormRow extends Block<ProfileDetail> {
    constructor(props: ProfileDetail) {
        super(
            'div',
            {
                ...props,
                className: styles.row,
            },
            {
                Input: new LabelInput({
                    ...props,
                    label: '',
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.label}">{{label}}</div>
            <div class="${styles.value}">
            {{{Input}}}
            </div>
        `;
    }
}
