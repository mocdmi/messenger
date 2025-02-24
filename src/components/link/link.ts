import styles from './styles.module.css';

// language=Handlebars
export default `
    <a href="{{#if to}}#{{else}}{{href}}{{/if}}"
       class="${styles.link}
                {{#if theme-default}}${styles.themeDefault}{{/if}}
                {{#if theme-danger}}${styles.themeDanger}{{/if}}"
        {{#if to}}data-to="{{to}}"{{/if}}>
        
        {{label}}
    </a>
`;
