import { Block } from '../../core';
import { Panel } from '../panel';
import { PopupProps } from './types';
import Inner from './parts/inner';
import styles from './styles.module.css';

export default class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(
            'div',
            {
                ...props,
                className: `
                    ${styles.popup}
                    ${props.active ? styles.active : ''}
                `,
            },
            {
                Body: new Panel({
                    Children: new Inner(props) as Block,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            {{{Body}}}
            <div class="${styles.substrate}"></div>
        `;
    }
}
