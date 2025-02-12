import styles from './styles.module.css';

// language=Handlebars
export default `
    <div class="${styles.signIn}">
        {{#> Panel}}
            <div class="${styles.inner}">
                <h2 class="${styles.title}">Регистрация</h2>
                <form action="#" method="post">
                    <div class="${styles.field}">
                        {{> Input
                                name="email"
                                value=""
                                type="email"
                                label="Почта"
                                theme-default=true
                                required=true}}
                    </div>
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
                                name=""
                                value=""
                                type="text"
                                label="Имя"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.field}">
                        {{> Input
                                name=""
                                value=""
                                type="text"
                                label="Фамилия"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.field}">
                        {{> Input
                                name=""
                                value=""
                                type="text"
                                label="Телефон"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.field}">
                        {{> Input
                                name=""
                                value=""
                                type="password"
                                label="Пароль"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.field}">
                        {{> Input
                                name=""
                                value=""
                                type="password"
                                label="Пароль (ещё раз)"
                                theme-default=true
                                required=true}}
                    </div>
                    <div class="${styles.submit}">
                        {{> Button type="submit" theme-default=true label="Зарегистрироваться"}}
                    </div>
                </form>
                <div class="${styles.login}">
                    {{> Link href="#" theme-default=true label="Войти"}}
                </div>
            </div>
        {{/Panel}}
    </div>
`;
