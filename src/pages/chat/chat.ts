import styles from './styles.module.css';

// language=Handlebars
export default `
<main class="${styles.main}">
    <header class="${styles.header}">
        <div class="${styles.info}">
            <div class="${styles.avatar}"></div>
            <h2 class="${styles.name}">Вадим</h2>
        </div>
        {{> Button type="button" rounded="true" theme-blank=true active=showActions icon="settings"}}
        {{#if showActions}}
            <div class="${styles.actionsPopup}">
                {{#> Panel}}
                    <div class="${styles.actions}">
                        {{> Button type="button" icon="add" label="Добавить пользователя"}}
                        {{> Button type="button" icon="remove" label="Удалить пользователя"}}
                    </div>
                {{/Panel}}
            </div>
        {{/if}}
    </header>
    <main class="${styles.chat}">
        <div class="${styles.noMessages}">Выберите чат чтобы отправить сообщение</div>
    </main>
    <div class="${styles.contacts}">
        {{> Contacts contacts=contacts}}
    </div>
    <form action="#" method="post" class="${styles.message}">
        <div class="${styles.input}">
            {{> Input
                    type="text"
                    name="message"
                    placeholder="Сообщение"
                    theme-color=true
                    rounded=true}}
        </div>
        {{> Button type="submit" theme-default=true rounded=true icon="next"}}
    </form>
    {{#> Popup title="Добавить пользователя" active=showAddAction}}
        <form action="#" method="post">
            <div class="${styles.actionField}">
                {{> Input
                        name="login"
                        value=""
                        type="text"
                        label="Логин"
                        theme-default=true
                        required=true}}
            </div>
            <div class="${styles.actionSubmit}">
                {{> Button type="submit" theme-default=true label="Добавить"}}
            </div>
        </form>
    {{/Popup}}
    {{#> Popup title="Удалить пользователя" active=showRemoveAction}}
        <form action="#" method="post">
            <div class="${styles.actionField}">
                {{> Input
                        name="login"
                        value=""
                        type="text"
                        label="Логин"
                        theme-default=true
                        required=true}}
            </div>
            <div class="${styles.actionSubmit}">
                {{> Button type="submit" theme-default=true label="Удалить"}}
            </div>
        </form>
    {{/Popup}}
</main>
`;
