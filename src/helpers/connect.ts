import { Block, BlockConstructor, Store, StoreEvents } from '../core';
import { Indexed } from '../types';
import { isEqual } from '../helpers';

export default function connect<TStore extends Indexed, TProps extends Indexed>(
    mapStateToProps: (store: TStore) => TProps,
) {
    return function <TAttrs extends Indexed = Indexed>(
        block: BlockConstructor<TProps, TAttrs>,
    ): BlockConstructor<TProps, TAttrs> {
        return class extends block {
            private readonly onChangeStoreCallback: () => void;

            constructor(props: TProps, children?: Record<string, Block | Block[]>) {
                const store = Store.getInstance();
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state }, children);

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                };

                Store.getInstance().on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            // TODO: разобраться с этим
            // componentWillUnmount(): void {
            //     super.componentWillUnmount();
            //     Store.getInstance().off(StoreEvents.Updated, this.onChangeStoreCallback);
            // }

            render(): string {
                return block.prototype.render.call(this);
            }
        };
    };
}
