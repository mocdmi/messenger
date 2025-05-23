import { Panel } from '@/components';
import { Block } from '@/core';
import { AuthService } from '@/services';
import SignUpFormContainer from './signUpFormContainer';
import styles from './styles.module.css';

export default class SignUpPage extends Block {
    private readonly authService = new AuthService();

    constructor() {
        super(
            'div',
            {},
            {
                Panel: new Panel({
                    'inner-class': styles.panel,
                    Children: new SignUpFormContainer(),
                }) as Block,
            },
        );
    }

    componentDidMount() {
        const getData = async () => {
            await this.authService.getUser();
        };

        void getData();
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
