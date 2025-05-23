import { initProps } from './config';
import { LoginFormProps } from './types';
import { AppStore } from '@/store';

export default function mapStateToProps(state: AppStore): LoginFormProps {
    return {
        ...initProps,
        isError: state.user.isError,
    };
}
