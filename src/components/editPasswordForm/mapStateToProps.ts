import { initProps } from '@/components/editPasswordForm';
import { AppStore } from '@/store';
import { EditPasswordFormProps } from './types';

export default function mapStateToProps(state: AppStore): EditPasswordFormProps {
    return {
        ...initProps,
        isError: state.user.isError,
    };
}
