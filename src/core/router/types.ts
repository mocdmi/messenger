import { Block } from '../../core';

type Attributes<T> = {
    className?: string;
    attrs?: T;
    events?: {
        [key: string]: (e: Event) => void;
    };
};

export type Props = Record<string, unknown>;

export type BlockConstructor<Props extends object = any, Attrs extends object = any> = new (
    props: Props & Attributes<Attrs>,
    children?: Record<string, Block | Block[]>,
) => Block<Props, Attrs>;
