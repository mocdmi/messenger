interface ChatProps {
    id: number;
    title: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
}

export interface MessengerProps {
    showActions: boolean;
    showAddAction: boolean;
    showRemoveAction: boolean;
    selectedChatName: string;
    selectedChatId: number;
    selectedChatAvatar: string;
    chats: ChatProps[];
}
