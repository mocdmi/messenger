import { ROUTER } from '@const';
import * as context from './context';
import { Router } from '@core';
import * as Pages from '@pages';
import '@assets/styles/styles.css';
import { ErrorContext } from './context/types/ErrorContext';
import { initStore } from './store';

initStore();

const router = Router.getInstance().createApp('#app');

router
    .use(ROUTER.messenger, Pages.Messenger)
    .use(ROUTER.editPassword, Pages.EditPasswordPage)
    .use(ROUTER.editProfile, Pages.EditProfilePage)
    .use(ROUTER.login, Pages.LoginPage)
    .use(ROUTER.settings, Pages.ProfilePage)
    .use(ROUTER.signUp, Pages.SignUpPage)
    .use<ErrorContext>('/404', Pages.ErrorPage, context.errorNotFoundContext)
    .use<ErrorContext>('/500', Pages.ErrorPage, context.errorServerContext)
    .start();
