import { Indexed } from '../../types';

export interface Link extends Indexed {
    label: string;
    to: string;
}
