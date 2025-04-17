import { Block } from '../../core';
import { BlockConstructor, Props } from '../router';

export default class Route<P extends object = {}> {
    private readonly path: string;
    private readonly rootQuery: string;
    private block: Block<P> | null;
    private readonly context: P;
    private readonly BlockClass: BlockConstructor<P>;

    constructor(path: string, BlockClass: BlockConstructor<P>, props: Props = {}) {
        const { rootQuery, ...context } = props;

        this.path = path;
        this.rootQuery = rootQuery as string;
        this.context = context as P;
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

    private renderDom(selector: string, block: Block<P>) {
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
