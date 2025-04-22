import { Block } from '../../core';
import { Indexed } from '../../types';

export interface PopupProps extends Indexed {
    title: string;
    active?: boolean;
    Children: Block;
    handlerHidePopup: () => void;
}
