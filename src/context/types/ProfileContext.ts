import { Indexed } from '@types';

export interface ProfileDetail extends Indexed {
    label: string;
    name: string;
    value: string;
}

export interface ProfileContext extends Indexed {
    name: string;
    detail: ProfileDetail[];
    password: string;
}
