import styles from './styles.module.css';

// language=Handlebars
export default `
{{#> Profile name=false}}
<form action="#" method="post">
    <div class="${styles.detail}">
        <div class="${styles.row}">
            <div class="${styles.label}">Старый пароль</div>
            <div class="${styles.value}">
                {{> Input
                        type="password"
                        name="oldPassword"
                        value=password
                        theme-blank=true
                        align-right=true
                        placeholder-right=true
                        required=required }}
            </div>
        </div>
        <div class="${styles.row}">
            <div class="${styles.label}">Новый пароль</div>
            <div class="${styles.value}">
                {{> Input
                        type="password"
                        name="newPassword"
                        value=""
                        theme-blank=true
                        align-right=true
                        placeholder-right=true
                        required=required }}
            </div>
        </div>
        <div class="${styles.row}">
            <div class="${styles.label}">Повторите новый пароль</div>
            <div class="${styles.value}">
                {{> Input
                        type="password"
                        name="newPasswordConfirm"
                        value=""
                        theme-blank=true
                        align-right=true
                        placeholder-right="true"
                        required=required }}
            </div>
        </div>
    </div>
    <div class="${styles.save}">
        {{> Button type="submit" theme-default=true label="Сохранить"}}
    </div>
</form>
{{/Profile}}
`;
