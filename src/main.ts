import { ROUTER } from '@/const';
import { Router } from '@/core';
import * as Pages from '@/pages';
import '@/assets/styles/styles.css';
import { initStore } from '@/store';

initStore();

const router = Router.getInstance().createApp('#app');

router
    .use(ROUTER.messenger, Pages.Messenger)
    .use(ROUTER.editPassword, Pages.EditPasswordPage)
    .use(ROUTER.editProfile, Pages.EditProfilePage)
    .use(ROUTER.login, Pages.LoginPage)
    .use(ROUTER.settings, Pages.ProfilePage)
    .use(ROUTER.signUp, Pages.SignUpPage)
    .use('/404', Pages.ErrorPage)
    .start();
