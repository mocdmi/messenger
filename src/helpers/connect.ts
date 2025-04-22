import { Block, BlockConstructor, Store, StoreEvents } from '../core';
import { Indexed } from '../types';
import { isEqual } from '../helpers';

export default function connect<TStateProps extends Indexed>(
    mapStateToProps: (store: Indexed) => TStateProps,
) {
    return function <TProps extends Indexed = Indexed, TAttrs extends Indexed = Indexed>(
        block: BlockConstructor<TProps & TStateProps, TAttrs>,
    ) {
        return class extends block {
            constructor(props: TProps & TStateProps, children?: Record<string, Block | Block[]>) {
                const store = Store.getInstance();
                let state = mapStateToProps(store.getState());

                super(props, children);

                Store.getInstance().on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...this.props, ...newState });
                    }

                    state = newState;
                });
            }

            render(): string {
                return block.prototype.render.call(this);
            }
        };
    };
}

export const withUser = connect((state) => ({ user: state.user }));
