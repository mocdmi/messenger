export interface Chat {
    id: number;
    title: string;
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
