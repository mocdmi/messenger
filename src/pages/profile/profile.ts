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

    async componentDidMount() {
        await this.authService.getUser();
        super.componentDidMount();
    }

    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        this.updateNestedChildProps('Profile', 'Body', this.props);
        return super.componentDidUpdate(oldProps, newProps);
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}

export default connect<AppStore, ProfileProps>((state) => {
    return {
        items: [
            {
                label: 'Почта',
                value: state.user?.email,
            },
            {
                label: 'Логин',
                value: state.user?.login,
            },
            {
                label: 'Имя',
                value: state.user?.first_name,
            },
            {
                label: 'Фамилия',
                value: state.user?.second_name,
            },
            {
                label: 'Имя в чате',
                value: state.user?.display_name,
            },
            {
                label: 'Телефон',
                value: state.user?.phone,
            },
        ],
    };
})(ProfilePage);
