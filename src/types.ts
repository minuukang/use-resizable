export type ResizeDirection = 'left' | 'right' | 'up' | 'down';
export type ResizeDirectionGroup = 'horizontal' | 'vertical';
export type ResizableReducerActions =
  | { type: 'init'; payload: { size: number } }
  | { type: 'start' | 'move'; payload: { position: number } }
  | { type: 'end' };

export interface IResizableOption {
  direction: ResizeDirection;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

export interface IResizableState extends IResizableOption {
  position?: number;
  initSize?: number;
  isMove?: boolean;
}

export const directionGroupMap: Record<
  ResizeDirection,
  ResizeDirectionGroup
> = {
  left: 'horizontal',
  right: 'horizontal',
  up: 'vertical',
  down: 'vertical',
};

export const directionCalcMap: Record<ResizeDirection, number> = {
  left: -1,
  right: 1,
  up: -1,
  down: 1,
};

export const windowEventTypes = [
  'mousemove',
  'touchmove',
  'mouseup',
  'touchend',
];
