import { Indexed } from '@types';

export interface IChat extends Indexed {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatContext extends Indexed {
    chats: IChat[];
}
