import { Block } from '@core';
import { InputType } from './types';

interface InputAttrs {
    type: InputType;
    name: string;
    value: string;
    accept?: string;
    placeholder?: string;
}

interface InputProps extends InputAttrs {
    className?: string;
    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
}

// TODO: ошибка при нажатии enter в инпуте
//  block.ts:139 Uncaught NotFoundError: Failed to execute 'replaceWith' on 'Element': The node to be removed is no
//  longer a child of this node. Perhaps it was moved in a 'blur' event handler?
export default class Input extends Block<InputProps, InputAttrs> {
    constructor(props: InputProps) {
        super('input', {
            ...props,
            attrs: {
                type: props.type,
                name: props.name,
                value: props.value,
                accept: props.accept,
                placeholder: props.placeholder,
            },
            events: {
                ...(props.onChange ? { change: props.onChange } : {}),
                ...(props.onBlur ? { blur: props.onBlur } : {}),
            },
        });
    }

    // language=Handlebars
    render(): string {
        return '';
    }
}
