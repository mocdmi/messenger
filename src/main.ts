import { ROUTER } from '@const';
import * as context from './context';
import { Router, Store } from '@core';
import * as Pages from '@pages';
import '@assets/styles/styles.css';
import { AppStore } from '@types';

const router = Router.getInstance().createApp('#app');

router
    .use(ROUTER.messenger, Pages.Messenger, context.chatContext)
    .use(ROUTER.editPassword, Pages.EditPasswordPage)
    .use(ROUTER.editProfile, Pages.EditProfilePage, context.profileContext)
    .use(ROUTER.login, Pages.LoginPage)
    .use(ROUTER.settings, Pages.ProfilePage)
    .use(ROUTER.signUp, Pages.SignUpPage)
    .use('/404', Pages.ErrorPage, context.errorNotFoundContext)
    .use('/500', Pages.ErrorPage, context.errorServerContext)
    .start();

Store.getInstance().createStore<AppStore>({
    user: null,
});
