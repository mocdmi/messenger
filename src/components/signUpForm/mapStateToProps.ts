import { initProps } from '@/components/signUpForm';
import { SignUpFormProps } from './types';
import { AppStore } from '@/store';

export default function mapStateToProps(state: AppStore): SignUpFormProps {
    return {
        ...initProps,
        isError: state.user.isError,
    };
}
