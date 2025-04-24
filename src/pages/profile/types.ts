import { Indexed } from '../../types';

export interface ProfileProps extends Indexed {
    items: ProfileItem[];
}

interface ProfileItem {
    label: string;
    value: unknown;
}
