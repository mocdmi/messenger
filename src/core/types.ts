import { Block } from '../core';
import { Indexed } from '../types';

export type Attributes<TArgs> = {
    className?: string;
    attrs?: TArgs;
    events?: {
        [key: string]: (e: Event) => void;
    };
};

export type BlockConstructor<
    TProps extends Indexed = Indexed,
    TArgs extends Indexed = Indexed,
> = new (
    props: TProps & Attributes<TArgs>,
    children?: Record<string, Block | Block[]>,
) => Block<TProps, TArgs>;

export enum StoreEvents {
    Updated = 'updated',
}
