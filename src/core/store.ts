import { EventBus, StoreEvents } from '@core';
import { set } from '@helpers';
import { Indexed } from '@types';

export default class Store extends EventBus {
    private static instance: Store;
    private state: Indexed = {};

    private constructor() {
        super();
    }

    static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }

        return Store.instance;
    }

    createStore<TStore extends Indexed>(defaultState: TStore): void {
        this.state = defaultState;
    }

    getState<TStore extends Indexed = typeof this.state>(): TStore {
        return this.makeStateProxy<TStore>(this.state as TStore);
    }

    set(path: string, value: unknown): void {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated, this.state);
    }

    private makeStateProxy<TStore extends Indexed>(state: TStore): TStore {
        return new Proxy<TStore>(state, {
            set: (): never => {
                throw new Error('No access to set props');
            },

            deleteProperty: (): never => {
                throw new Error('No access to delete props');
            },
        });
    }
}
