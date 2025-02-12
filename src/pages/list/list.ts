import styles from './styles.module.css';

// language=Handlebars
export default `
<main class="${styles.list}">
    <nav>
        <ul class="${styles.nav}">
        <li class="${styles.item}">
            {{> Link theme-default=true to="chat" label="Chat page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="profile" label="Profile page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="edit-profile" label="Edit profile page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="edit-password" label="Edit password page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="login" label="Login page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="sign-in" label="Sign-in page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="server-error" label="Server error page"}}
        </li>
        <li class="${styles.item}">
            {{> Link theme-default=true to="not-found" label="Not found page"}}
        </li>
    </ul>
    </nav>
</main>
`;
