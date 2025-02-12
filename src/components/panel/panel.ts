import styles from './styles.module.css';

// language=Handlebars
export default `
<div class="${styles.panel}">
    {{> @partial-block }}
</div>
`;
