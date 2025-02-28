import { Block } from '../../../core';
import { LabelInput } from '../../label-input';
import styles from '../styles.module.css';

export default class SearchForm extends Block {
    constructor() {
        super(
            'form',
            {
                className: styles.search,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
            },
            {
                SearchInput: new LabelInput({
                    'placeholder-center': true,
                    'theme-color': true,
                    placeholder: 'Поиск',
                    icon: 'search',
                    type: 'text',
                    name: 'search',
                    value: '',
                    required: true,
                }) as Block,
            },
        );
    }

    render(): string {
        return '{{{SearchInput}}}';
    }
}
