export interface ProfileProps {
    items: ProfileItem[];
}

interface ProfileItem {
    label: string;
    value: unknown;
}
