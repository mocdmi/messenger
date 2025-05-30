import { EditProfileForm, Profile } from '@/components';
import { initProps } from '@/components/editProfileForm';
import { Block } from '@/core';

export default class EditProfilePage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                EditProfile: new Profile({
                    Children: new EditProfileForm(initProps) as Block,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return '{{{EditProfile}}}';
    }
}
