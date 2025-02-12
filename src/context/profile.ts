import { ProfileContext, ProfileDetail } from './types/ProfileContext';

const detail: ProfileDetail[] = [
    {
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
    },
    {
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
    },
    {
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
    },
    {
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text',
    },
    {
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        type: 'text',
    },
];

export const profileContext: ProfileContext = {
    name: 'Иван',
    password: '123456',
    showEditAvatar: false,
    detail,
};
