import { Indexed } from '../../types';

export interface ErrorContext extends Indexed {
    status: number;
    message: string;
}
