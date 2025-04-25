import { Profile } from '@components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '@core';
import EditForm from './parts/editForm';

export default class EditProfilePage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditProfile: new Profile({
                name: props.name,
                Children: new EditForm(props) as unknown as Block,
            }) as unknown as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{EditProfile}}}';
    }
}
