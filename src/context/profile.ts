import { ProfileContext, ProfileDetail } from './types/ProfileContext';

const detail: ProfileDetail[] = [
    {
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
    },
    {
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
    },
    {
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
    },
    {
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
    },
    {
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
    },
];

const profileContext: ProfileContext = {
    name: 'Иван',
    password: '123456',
    detail,
};

export default profileContext;
