export interface Chat {
    id: number;
    title: string;
    lastMessage?: string;
    lastMessageTime?: string;
    newMessagesNum?: number;
    createdBy: number;
    avatar?: string;
}
