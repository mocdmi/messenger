import styles from './styles.module.css';

// language=Handlebars
export default `
<main class="${styles.error}">
    <h1 class="${styles.status}">{{status}}</h1>
    <div class="${styles.message}">{{message}}</div>
    {{> Link href="#" theme-default=true label="Назад к чатам"}}
</div>
`;
