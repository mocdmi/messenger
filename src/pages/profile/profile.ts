import { Profile } from '@/components';
import { Block, Store } from '@/core';
import { connect } from '@/helpers';
import { AuthService } from '@/services';
import { AppStore } from '@/store';
import ProfileInner from './parts/profileInner';
import mapStateToProps from './mapStateToProps';
import { ProfileProps } from './types';

class ProfilePage extends Block<ProfileProps> {
    private readonly authService = new AuthService();
    private readonly store = Store.getInstance();

    constructor(props: ProfileProps) {
        super('div', props, {
            Profile: new Profile({
                Children: new ProfileInner(props) as Block,
            }) as Block,
        });
    }

    componentDidMount() {
        const getUser = async () => {
            if (!this.store.getState<AppStore>().user.user) {
                await this.authService.getUser();
            }
        };

        void getUser();
    }

    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        if (oldProps !== newProps) {
            const profile = this.children.Profile as Block;

            if (profile) {
                const bodyChildren = profile.children.Body;

                if (Array.isArray(bodyChildren) && bodyChildren.length > 0) {
                    const profileInner = bodyChildren[0] as Block;

                    if (profileInner) {
                        profileInner.setProps(newProps);
                    }
                }
            }
        }

        return true;
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}

export default connect<AppStore, ProfileProps>(mapStateToProps)(ProfilePage);
