import { Block } from '@/core';
import styles from './styles.module.css';

interface LoadingProps {
    modificator?: string;
    text?: string;
}

export default class Loading extends Block<LoadingProps> {
    constructor(props: LoadingProps) {
        super('div', {
            ...props,
            className: `
                ${styles.loading}
                ${props.modificator ? props.modificator : ''}
            `,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            {{text}}
        `;
    }
}
