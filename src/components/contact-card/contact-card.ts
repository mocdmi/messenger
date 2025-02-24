import styles from './styles.module.css';

// language=Handlebars
export default `
<section class="${styles.card}">
    <div class="${styles.inner} {{#if active}}${styles.active}{{/if}}">
        <div class="${styles.avatarWrap}">
            <div class="${styles.avatar}"></div>
        </div>
        <h2 class="${styles.name}">{{name}}</h2>
        <div class="${styles.lastMessage}">{{lastMessage}}</div>
        <div class="${styles.date}">{{date}}</div>
        {{#if newCount}}<div class="${styles.newCount}">{{newCount}}</div>{{/if}}
    </div>
</section>
`;
