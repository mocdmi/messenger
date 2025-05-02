import { Block } from '@core';
import { Profile } from '@components';
import EditForm from './parts/editForm';
import { EditPasswordProps } from './types';
import { AuthService } from '@services';
import mapStateToProps from './mapStateToProps';
import { connect } from '@helpers';

class EditPasswordPage extends Block<EditPasswordProps> {
    private readonly authService = new AuthService();

    constructor(props: EditPasswordProps) {
        super('div', props, {
            EditPassword: new Profile({
                name: (props.name as string) || 'Пользователь',
                avatar: props.avatar,
                Children: new EditForm(props) as Block,
            }) as Block,
        });
    }

    componentDidMount() {
        const getUser = async () => {
            await this.authService.getUser();
        };

        getUser();
    }

    componentDidUpdate(oldProps: EditPasswordProps, newProps: EditPasswordProps): boolean {
        if (oldProps !== newProps) {
            const editPassword = this.children.EditPassword as Block;

            if (editPassword) {
                const Avatar = editPassword.children.Avatar as Block;
                const bodyChildren = editPassword.children.Body;

                if (Array.isArray(bodyChildren) && bodyChildren.length > 0) {
                    const editForm = bodyChildren[0] as Block;

                    if (editForm) {
                        editForm.setProps(newProps);
                    }
                }

                if (Avatar) {
                    Avatar.setProps({ name: newProps.name as string });
                }
            }

            return true;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return '{{{EditPassword}}}';
    }
}

export default connect(mapStateToProps)(EditPasswordPage);
