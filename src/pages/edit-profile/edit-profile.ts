import { Button, LabelInput, Form, Profile, ProfileRow, Wrapper } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import styles from './styles.module.css';

export default class EditProfilePage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditProfile: new Profile({
                Children: new Form({
                    action: '#',
                    method: 'POST',
                    Children: [
                        new Wrapper({
                            tagName: 'div',
                            className: styles.detail,
                            Children: props.detail.map(({ label, ...input }) => {
                                return new ProfileRow({
                                    label,
                                    Children: new LabelInput({
                                        ...input,
                                        'theme-blank': true,
                                        'align-right': true,
                                        'placeholder-right': true,
                                    }) as Block,
                                });
                            }) as Block[],
                        }) as Block,
                        new Wrapper({
                            tagName: 'div',
                            className: styles.save,
                            Children: new Button({
                                'theme-default': true,
                                label: 'Сохранить',
                                type: 'submit',
                            }) as Block,
                        }) as Block,
                    ],
                }) as Block,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{EditProfile}}}';
    }
}
