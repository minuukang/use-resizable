import * as React from 'react';
import { IResizableOption, directionGroupMap, windowEventTypes } from './types';
export { IResizableOption } from './types';
import { resizableReducer, createActionFromEvent } from './reducer';

export default function useResizable(option: IResizableOption) {
  const ref = React.useRef<HTMLElement & HTMLDivElement>(null);
  const [state, dispatch] = React.useReducer(resizableReducer, option);
  const handleStartMove = React.useCallback(
    (event: React.MouseEvent) => {
      dispatch(createActionFromEvent(group, event.nativeEvent));
    },
    [dispatch]
  );
  const group = directionGroupMap[state.direction];
  React.useEffect(() => {
    if (!option.size && ref.current) {
      dispatch({
        type: 'init',
        payload: {
          size:
            group === 'vertical'
              ? ref.current.offsetHeight
              : ref.current.offsetWidth,
        },
      });
    }
  }, [option.size, group]);
  React.useEffect(() => {
    const dispatchEvent = (event: MouseEvent | TouchEvent) => {
      dispatch(createActionFromEvent(group, event));
    };
    if (state.isMove) {
      windowEventTypes.forEach((type) =>
        window.addEventListener(type, dispatchEvent)
      );
      document.body.style.cursor =
        group === 'vertical' ? 'row-resize' : 'col-resize';
    }
    return () => {
      windowEventTypes.forEach((type) =>
        window.removeEventListener(type, dispatchEvent)
      );
      document.body.style.cursor = '';
    };
  }, [state.isMove, group, dispatch]);
  return {
    ref,
    size: state.size,
    handler: handleStartMove,
  };
}
