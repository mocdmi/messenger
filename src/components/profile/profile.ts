import styles from './styles.module.css';

// language=Handlebars
export default `
<div class="${styles.profile}">
    <main class="${styles.inner}">
        <div class="${styles.avatar}">
            {{> ProfileAvatar}}
        </div>
        {{> @partial-block}}
    </main>
    <div class="${styles.back}">
        {{> Button type="button" rounded=true theme-default=true icon="prev"}}
    </div>
</div>
`;
