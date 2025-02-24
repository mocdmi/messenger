import styles from './styles.module.css';

// language=Handlebars
export default `
<nav class="${styles.contacts}">
    <div class="${styles.linkWrap}">
        <a href="#" class="${styles.link}">Профиль</a>
    </div>
    <form action="#" method="post" class="${styles.search}">
        {{> Input
            type="text"
            name="search"
            placeholder="Поиск"
            theme-color=true
            placeholder-center=true
            icon="search" }}
    </form>
    <div>
        {{#each contacts}}
            {{> ContactCard}}
        {{/each}}
    </div>
</nav>
`;
