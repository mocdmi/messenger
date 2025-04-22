import { Block } from '../../core';
import { Indexed } from '../../types';
import styles from './styles.module.css';

interface PanelProps extends Indexed {
    'inner-class'?: string;
    Children: Block | Block[];
}

export default class Panel extends Block<PanelProps> {
    constructor(props: PanelProps) {
        super(
            'div',
            {
                ...props,
                className: styles.panel,
            },
            {
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="{{inner-class}}">
                {{#each Body}}
                    {{{this}}}
                {{/each}}
            </div>
        `;
    }
}
