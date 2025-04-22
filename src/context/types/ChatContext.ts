import { Indexed } from '../../types';

export interface Contact extends Indexed {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatContext extends Indexed {
    contacts: Contact[];
}
