export interface Contact {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatContext {
    showActions: boolean;
    showAddAction: boolean;
    showRemoveAction: boolean;
    contacts: Contact[];
}
