interface ChatProps {
    id: number;
    title: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
}

export interface MessengerProps {
    selectedChatName: string;
    selectedChatAvatar: string;
    chats: ChatProps[];
}
