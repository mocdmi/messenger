import { Block } from '../../core';

interface WrapperProps {
    tagName: string;
    Children: Block | Block[];
    className?: string;
}

export default class Wrapper extends Block<WrapperProps> {
    constructor(props: WrapperProps) {
        super(props.tagName, props, {
            Body: Array.isArray(props.Children) ? props.Children : [props.Children],
        });
    }

    // language=Handlebars
    render(): string {
        return `
            {{#each Body}}
                {{{this}}}
            {{/each}}
        `;
    }
}
