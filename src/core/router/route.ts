import { Block } from '../../core';
import { BlockConstructor, Props } from '../router';

export default class Route<T extends Block> {
    private readonly path: string;
    private readonly rootQuery: string;
    private block: T | null;
    private readonly context: Record<string, unknown>;
    private readonly BlockClass: new (props: Props) => T;

    constructor(path: string, BlockClass: BlockConstructor<T>, props: Props = {}) {
        const { rootQuery, ...context } = props;

        this.path = path;
        this.rootQuery = rootQuery as string;
        this.context = context;
        this.block = null;
        this.BlockClass = BlockClass;
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(path: string): boolean {
        return path === this.path;
    }

    private renderDom(selector: string, block: T) {
        const root = document.querySelector(selector);

        if (!root) {
            throw new Error(`Element with selector "${selector}" not found`);
        }

        root.innerHTML = '';
        root.append(block.getContent());
    }

    render() {
        if (!this.block) {
            this.block = new this.BlockClass(this.context);
        }

        this.renderDom(this.rootQuery, this.block);
        this.block.componentDidMount();
    }
}
