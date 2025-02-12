import styles from './styles.module.css';

// language=Handlebars
export default `
    <div class="${styles.login}">
        {{#> Panel}}
            <div class="${styles.inner}">
                <h2 class="${styles.title}">Вход</h2>
                <form action="#" method="post">
                    <div class="${styles.field}">
                        {{> Input
                                name="login"
                                value=""
                                type="text"
                                label="Логин"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.field}">
                        {{> Input
                                name="password"
                                value=""
                                type="password"
                                label="Пароль"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.submit}">
                        {{> Button type="submit" theme-default=true label="Авторизоваться"}}
                    </div>
                </form>
                <div class="${styles.signin}">
                    {{> Link href="#" theme-default=true label="Нет аккаунта?"}}
                </div>
            </div>
        {{/Panel}}
    </div>
`;
