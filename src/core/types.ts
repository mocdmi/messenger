import { Block } from '../core';
import { Indexed } from '../types';

export type Attributes<TAttrs> = {
    className?: string;
    attrs?: TAttrs;
    events?: {
        [key: string]: (e: Event) => void;
    };
};

export type BlockConstructor<
    TProps extends Indexed = Indexed,
    TAttrs extends Indexed = Indexed,
> = new (
    props: TProps & Attributes<TAttrs>,
    children?: Record<string, Block | Block[]>,
) => Block<TProps, TAttrs>;

export enum StoreEvents {
    Updated = 'updated',
}
