import { Profile } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import { authService } from '../../services';
import ProfileInner from './parts/profile-inner';

export default class ProfilePage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                Profile: new Profile({
                    Children: new ProfileInner() as unknown as Block,
                }) as unknown as Block,
            },
        );
    }

    componentDidMount() {
        authService.getUserInfo();
        super.componentDidMount();
    }

    componentDidUpdate(oldProps: ProfileContext, newProps: ProfileContext): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}
