import styles from './styles.module.css';

// language=Handlebars
export default `
{{#> Profile name=false}}
<form action="#" method="post">
    <div class="${styles.detail}">
        {{#each detail}}
            <div class="${styles.row}">
                <div class="${styles.label}">{{label}}</div>
                <div class="${styles.value}">
                    {{> Input label=false theme-blank=true align-right=true}}
                </div>
            </div>
        {{/each}}
    </div>
    <div class="${styles.save}">
        {{> Button type="submit" theme-default=true label="Сохранить"}}
    </div>
</form>
{{/Profile}}
`;
