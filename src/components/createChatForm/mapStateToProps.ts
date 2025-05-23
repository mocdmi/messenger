import { AppStore } from '@/store';
import { initProps } from './config';
import { CreateChatFormProps } from './types';

export default function mapStateToProps(state: AppStore): CreateChatFormProps {
    return {
        ...initProps,
        isError: state.selectedChat.isError,
    };
}
