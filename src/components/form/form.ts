import { Block } from '../../core';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FormAttrs {
    method: Method;
    action: string;
}

interface FormProps extends FormAttrs {
    className?: string;
    Children: Block | Block[];
}

export default class Form extends Block<FormProps> {
    constructor(props: FormProps) {
        super(
            'form',
            {
                ...props,
                attrs: {
                    method: props.method,
                    action: props.action,
                },
            },
            {
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
            },
        );
    }

    render(): string {
        return `
            {{#each Body}}
                {{{this}}}
            {{/each}}
        `;
    }
}
