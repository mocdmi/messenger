import { Panel } from '@components';
import { Block, Store, StoreEvents } from '@core';
import PanelInner from './parts/panelInner';
import styles from './styles.module.css';

export default class SignUpPage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                Panel: new Panel({
                    Children: new PanelInner(),
                }) as Block,
            },
        );

        const store = Store.getInstance();

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
            console.log('Store updated', store.getState());
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.signUp}">
                {{{Panel}}}
            </main>
        `;
    }
}
