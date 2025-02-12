import styles from './styles.module.css';

// language=Handlebars
export default `
{{#if active}}
    <div class="${styles.popup}">
        {{#> Panel}}
            <div class="${styles.inner}">
                <h2 class="${styles.title}">{{title}}</h2>
                {{> @partial-block }}
            </div>
        {{/Panel}}
        <div class="${styles.substrate}"></div>
    </div>
{{/if}}
`;
