import styles from './styles.module.css';
import noPhoto from '../../assets/images/no-photo.svg';

// language=Handlebars
export default `
<div class="${styles.avatar}">
    <div class="${styles.photoWrap}">
        <img src="${noPhoto}" class="${styles.photo}" alt="{{name}}" />
        <div class="${styles.editAvatar}">
            {{> Button type="submit" theme-blank-light=true label="Поменять аватар"}}
        </div>
    </div>
    {{#if name}}<h2 class="${styles.name}">{{name}}</h2>{{/if}}
    {{#> Popup title="Загрузите файл" active=showEditAvatar}}
        <form action="#" method="post">
            <label class="${styles.uploadAvatar}">
                <div class="${styles.label}">
                    Выбрать файл на<br />
                    компьютере
                </div>
                <input type="file" name="upload" accept="image/*" class="${styles.input}" />
            </label>
            <div class="${styles.actionSubmit}">
                {{> Button type="submit" theme-default=true label="Поменять"}}
            </div>
        </form>
    {{/Popup}}
</div>
`;
