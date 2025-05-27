import { AppStore } from '@/store';
import { EditProfileFormProps } from './types';

export default function mapStateToProps(state: AppStore): EditProfileFormProps {
    return {
        form: {
            email: {
                value: state.user.user?.email ?? '',
                error: '',
            },
            login: {
                value: state.user.user?.login ?? '',
                error: '',
            },
            first_name: {
                value: state.user.user?.first_name ?? '',
                error: '',
            },
            second_name: {
                value: state.user.user?.second_name ?? '',
                error: '',
            },
            display_name: {
                value: state.user.user?.display_name ?? '',
                error: '',
            },
            phone: {
                value: state.user.user?.phone ?? '',
                error: '',
            },
        },
        isError: state.user.isError,
    };
}
