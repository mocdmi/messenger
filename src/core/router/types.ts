import { Block } from '../../core';

export type Props = Record<string, unknown>;
export type BlockConstructor<T extends Block> = new (props: Props) => T;
