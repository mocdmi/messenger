import styles from './styles.module.css';

// language=Handlebars
export default `
{{#> Profile}}
    <div class="${styles.detail}">
        {{#each detail}}
            <div class="${styles.row}">
                <div class="${styles.label}">{{label}}</div>
                <div class="${styles.value}">{{value}}</div>
            </div>
        {{/each}}
    </div>
    <nav>
        <div class="${styles.row}">
            {{> Link href="#" theme-default=true label="Изменить данные" }}
        </div>
        <div class="${styles.row}">
            {{> Link href="#" theme-default=true label="Изменить пароль" }}
        </div>
        <div class="${styles.row}">
            {{> Link href="#" theme-danger=true label="Выйти" }}
        </div>
    </nav>
{{/Profile}}
`;
