import { Block, BlockConstructor, Router } from '../core';

export default function withRouter<P extends object = object, A extends object = object>(
    block: BlockConstructor<P, A>,
): BlockConstructor<P, A> {
    return class extends block {
        constructor(props: P, children?: Record<string, Block | Block[]>) {
            super({ ...props, router: Router.getInstance() }, children);
        }

        render(): string {
            return block.prototype.render.call(this);
        }
    };
}
