import {
  IResizableState,
  ResizableReducerActions,
  directionCalcMap,
  ResizeDirectionGroup,
} from './types';

function eventIsTouch(event: Event): event is TouchEvent {
  return event.type.includes('touch');
}

function getPositionFromMouseOrTouch(
  direction: ResizeDirectionGroup,
  event: MouseEvent | TouchEvent
) {
  if (eventIsTouch(event)) {
    return direction === 'vertical'
      ? event.touches[0].screenY
      : event.touches[0].screenX;
  } else {
    return direction === 'vertical' ? event.screenY : event.screenX;
  }
}

export function resizableReducer(
  state: IResizableState,
  action: ResizableReducerActions
): IResizableState {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        size: action.payload.size,
      };
    }
    case 'start': {
      return {
        ...state,
        isMove: true,
        position: action.payload.position,
        initSize: state.size,
      };
    }
    case 'move': {
      if (
        !state.isMove ||
        state.position === undefined ||
        state.initSize === undefined
      ) {
        return state;
      }
      const calc = directionCalcMap[state.direction];
      let size =
        state.initSize + (action.payload.position - state.position) * calc;
      if (state.maxSize && size > state.maxSize) {
        size = state.maxSize;
      }
      if (state.minSize && size < state.minSize) {
        size = state.minSize;
      }
      return {
        ...state,
        size,
      };
    }
    case 'end': {
      return {
        ...state,
        isMove: false,
        initSize: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

export function createActionFromEvent(
  direction: ResizeDirectionGroup,
  event: MouseEvent | TouchEvent
): ResizableReducerActions {
  switch (event.type) {
    case 'mousedown':
    case 'touchstart':
    case 'mousemove':
    case 'touchmove': {
      return {
        type: event.type.includes('move') ? 'move' : 'start',
        payload: {
          position: getPositionFromMouseOrTouch(direction, event),
        },
      };
    }
    case 'mouseup':
    case 'touchend': {
      return {
        type: 'end',
      };
    }
    default: {
      throw new Error(`${event.type} is not able to create event`);
    }
  }
}
