import { AppStore } from '@/store';
import { ChatActionsFormProps } from './types';
import { initProps } from './config';

export default function mapStateToProps(state: AppStore): ChatActionsFormProps {
    return {
        ...initProps,
        isError: state.selectedChat.isError,
    };
}
