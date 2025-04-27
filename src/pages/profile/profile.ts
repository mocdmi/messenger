import { Profile } from '@components';
import { Block } from '@core';
import { connect } from '@helpers';
import { AuthService } from '@services';
import { AppStore } from '@types';
import ProfileInner from './parts/profileInner';
import { ProfileProps } from './types';

class ProfilePage extends Block<ProfileProps> {
    private readonly authService = new AuthService();

    constructor(props: ProfileProps) {
        super('div', props, {
            Profile: new Profile({
                Children: new ProfileInner(props) as unknown as Block,
            }) as unknown as Block,
        });
    }

    componentDidMount() {
        const getUser = async () => {
            await this.authService.getUser();
            super.componentDidMount();
        };

        getUser();
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}

export default connect<AppStore, ProfileProps>((state) => {
    const user = state.user?.user;

    return {
        items: [
            {
                label: 'Почта',
                value: user?.email,
            },
            {
                label: 'Логин',
                value: user?.login,
            },
            {
                label: 'Имя',
                value: user?.first_name,
            },
            {
                label: 'Фамилия',
                value: user?.second_name,
            },
            {
                label: 'Имя в чате',
                value: user?.display_name,
            },
            {
                label: 'Телефон',
                value: user?.phone,
            },
        ],
    };
})(ProfilePage);
