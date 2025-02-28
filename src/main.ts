import * as context from './context';
import { Block } from './core';
import { renderDom } from './core/render-dom';
import * as Pages from './pages';
import './assets/styles/styles.css';
import { PageNames } from './types/page-names';

type PagesConfig = Record<
    PageNames,
    {
        component: (typeof Pages)[keyof typeof Pages];
        context?: object;
    }
>;

const pages: PagesConfig = {
    [PageNames.CHAT]: { component: Pages.ChatPage, context: context.chatContext },
    [PageNames.EDIT_PASSWORD]: {
        component: Pages.EditPasswordPage,
        context: context.profileContext,
    },
    [PageNames.EDIT_PROFILE]: { component: Pages.EditProfilePage, context: context.profileContext },
    [PageNames.LOGIN]: { component: Pages.LoginPage },
    [PageNames.LIST]: { component: Pages.ListPage },
    [PageNames.PROFILE]: { component: Pages.ProfilePage, context: context.profileContext },
    [PageNames.SIGN_IN]: { component: Pages.SignInPage },
    [PageNames.SERVER_ERROR]: { component: Pages.ErrorPage, context: context.errorServerContext },
    [PageNames.NOT_FOUND]: { component: Pages.ErrorPage, context: context.errorNotFoundContext },
};

function navigate(page: PageNames): void {
    const { component, context } = pages[page];
    const container = document.getElementById('app');

    if (container) {
        renderDom(new component(context) as Block); // TODO: Решить проблему с типом
    }
}

function route(e: Event): void {
    const target = e.target as HTMLElement;
    const to = target.getAttribute('data-to') as PageNames;

    if (to) {
        navigate(to);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
}

document.addEventListener('DOMContentLoaded', () => navigate(PageNames.LIST));
document.addEventListener('click', route);
