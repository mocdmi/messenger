import * as context from './context';
import { ChatContext } from './context/types/ChatContext';
import { BlockConstructor, Router } from './core/router';
import * as Pages from './pages';
import './assets/styles/styles.css';

const router = new Router('#app');

router
    .use('/', Pages.ChatPage, context.chatContext)
    .use('/edit-password', Pages.EditPasswordPage)
    .use('/edit-profile', Pages.EditProfilePage, context.profileContext)
    .use('/login', Pages.LoginPage)
    .use('/profile', Pages.ProfilePage, context.profileContext)
    .use('/sign-in', Pages.SignInPage)
    .use('/404', Pages.ErrorPage, context.errorNotFoundContext)
    .use('/500', Pages.ErrorPage, context.errorServerContext)
    .start();
