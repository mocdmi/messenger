import { Block } from '@/core';
import { EditPasswordForm, Profile } from '@/components';
import { initProps } from '@/components/editPasswordForm';

export default class EditPasswordPage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                EditPassword: new Profile({
                    Children: new EditPasswordForm(initProps) as Block,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return '{{{EditPassword}}}';
    }
}
