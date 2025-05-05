export interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatProps {
    showActions: boolean;
    showAddAction: boolean;
    showRemoveAction: boolean;
    chats: Chat[];
}
