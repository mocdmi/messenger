import Handlebars from 'handlebars';
import { chatContext, errorNotFoundContext, errorServerContext, profileContext } from './context';
import * as Pages from './pages';
import * as Components from './components';
import './assets/styles/styles.css';

const pageNames = [
    'chat',
    'edit-password',
    'edit-profile',
    'login',
    'list',
    'profile',
    'sign-in',
    'server-error',
    'not-found',
] as const;

type PageNames = (typeof pageNames)[number];

type PagesConfig = Record<PageNames, {
    component: typeof Pages[keyof typeof Pages],
    context?: object,
}>;

const pages: PagesConfig  = {
    'chat': { component: Pages.ChatPage, context: chatContext},
    'edit-password': { component: Pages.EditPasswordPage, context: profileContext },
    'edit-profile': { component: Pages.EditProfilePage, context: profileContext },
    'login': { component: Pages.LoginPage },
    'list': { component: Pages.ListPage },
    'profile': { component: Pages.ProfilePage, context: profileContext },
    'sign-in': { component: Pages.SignInPage },
    'server-error': { component: Pages.ErrorPage, context: errorServerContext },
    'not-found': { component: Pages.ErrorPage, context: errorNotFoundContext },
};

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template);
});

function navigate(page: PageNames): void {
    const { component, context } = pages[page];
    const container = document.getElementById('app');
    
    if (container) {
        const template = Handlebars.compile(component);
        container.innerHTML = template(context);
    }
}

function route (e: Event): void {
    const target = e.target as HTMLElement;
    const to = target.getAttribute('data-to') as PageNames;
    
    if (to) {
        navigate(to);
        
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}

document.addEventListener('DOMContentLoaded', () => navigate('list'));
document.addEventListener('click', route);
