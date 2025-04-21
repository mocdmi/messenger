import { EventBus, StoreEvents } from '../core';
import { set } from '../helpers';

export default class Store extends EventBus {
    private static instance: Store;
    private state = {};

    private constructor() {
        super();
    }

    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }

        return Store.instance;
    }

    getState() {
        return this.state;
    }

    set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated, this.state);
    }
}
