import { ChatContext, Contact } from './types/ChatContext';

const contacts: Contact[] = [
    {
        name: 'Андрей',
        lastMessage: 'Изображение',
        date: 'Пт',
        newCount: 2,
        active: true,
    },
    {
        name: 'Вася',
        lastMessage: 'Привет',
        date: '1 Мая 2020',
    }
];



export const chatContext: ChatContext = {
    showActions: false,
    showAddAction: false,
    showRemoveAction: false,
    contacts,
}
