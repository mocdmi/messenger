export default function formatDate(input: string): string {
    const date = new Date(input);
    const now = new Date();

    const isSameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isSameDay) {
        return time;
    } else {
        const fullDate = date.toLocaleDateString('ru-RU');
        return `${time} ${fullDate}`;
    }
}
