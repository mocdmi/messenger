import { Block } from '../../core';
import { Indexed } from '../../types';
import { Input } from '../input';
import { InputType } from '../input/types';
import styles from './styles.module.css';

export interface LabelInputProps extends Indexed {
    'theme-color'?: boolean;
    'theme-blank'?: boolean;
    'theme-default'?: boolean;
    'placeholder-center'?: boolean;
    'placeholder-right'?: boolean;
    'align-right'?: boolean;
    icon?: string;
    rounded?: boolean;
    label?: string;
    placeholder?: string;
    type: InputType;
    name: string;
    value: string;
    error?: string;
    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
}

export default class LabelInput extends Block<LabelInputProps> {
    constructor(props: LabelInputProps) {
        super(
            'label',
            {
                ...props,
                className: `
                    ${styles.input}
                    ${props['theme-color'] ? styles.themeColor : ''}
                    ${props['theme-blank'] ? styles.themeBlank : ''}
                    ${props['theme-default'] ? styles.themeDefault : ''}
                `,
            },
            {
                Input: new Input({
                    className: `
                        ${styles.field}
                        ${props.icon ? styles.withIcon : ''}
                        ${props.rounded ? styles.rounded : ''}
                        ${props['align-right'] ? styles.alignRight : ''}
                    `,
                    type: props.type,
                    name: props.name,
                    value: props.value,
                    placeholder: '',
                    onChange: props.onChange,
                    onBlur: props.onBlur,
                }) as unknown as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            {{#if label}}<div class="${styles.label}">{{label}}</div>{{/if}}
            {{{Input}}}
            <span class="${styles.placeholder}
                        {{#if placeholder-center}}${styles.placeholderCenter}{{/if}}
                        {{#if placeholder-right}}${styles.placeholderRight}{{/if}}">
                {{#if icon}}<span class="${styles.icon}" data-icon="{{icon}}"></span>{{/if}}
                {{#if placeholder}}
                    <span class="${styles.text}">
                        {{placeholder}}
                    </span>
                {{/if}}
            </span>
            {{#if error}}
                <div class=${styles.errorMessage}>{{error}}</div>
            {{/if}}
        `;
    }
}
