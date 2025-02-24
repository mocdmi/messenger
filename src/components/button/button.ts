import styles from './styles.module.css';

// language=Handlebars
export default `
<button class="${styles.button}
                {{#if rounded}}${styles.rounded}{{/if}}
                {{#if theme-default}}${styles.themeDefault}{{/if}}
                {{#if theme-blank}}${styles.themeBlank}{{/if}}
                {{#if theme-blank-light}}${styles.themeBlankLight}{{/if}}
                {{#if active}}${styles.active}{{/if}}"
        type="{{type}}">
    {{#if icon}}<div class="${styles.icon} {{#if label}}${styles.iconOffset}{{/if}}" data-icon="{{icon}}"></div>{{/if}}
    {{label}}
</button>
`;
