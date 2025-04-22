import { Block, BlockConstructor, Router } from '../core';
import { Indexed } from '../types';

export default function withRouter<
    TProps extends Indexed = Indexed,
    TArgs extends Indexed = Indexed,
>(block: BlockConstructor<TProps, TArgs>): BlockConstructor<TProps, TArgs> {
    return class extends block {
        constructor(props: TProps, children?: Record<string, Block | Block[]>) {
            super({ ...props, router: Router.getInstance() }, children);
        }

        render(): string {
            return block.prototype.render.call(this);
        }
    };
}
