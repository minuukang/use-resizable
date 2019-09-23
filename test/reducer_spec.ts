import { resizableReducer, createActionFromEvent } from '../src/reducer';
import {
  IResizableState,
  ResizeDirection,
  ResizableReducerActions,
} from '../src/types';

describe('createActionFromEvent', () => {
  let event: MouseEvent | TouchEvent;
  let action: ResizableReducerActions;
  describe('when start action', () => {
    describe('when mousedown event', () => {
      beforeEach(() => {
        event = new MouseEvent('mousedown', {
          screenX: 100,
          screenY: 200,
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get start action, position from screenY', () => {
          expect(action.type).toBe('start');
          expect(action).toHaveProperty(['payload', 'position'], 200);
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get start action, position from screenX', () => {
          expect(action.type).toBe('start');
          expect(action).toHaveProperty(['payload', 'position'], 100);
        });
      });
    });

    describe('when touchstart event', () => {
      beforeEach(() => {
        event = new TouchEvent('touchstart', {
          touches: [
            {
              screenX: 200,
              screenY: 100,
            } as Touch,
          ],
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get start action, position from touches[0].screenY', () => {
          expect(action.type).toBe('start');
          expect(action).toHaveProperty(['payload', 'position'], 100);
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get start action, position from touches[0].screenX', () => {
          expect(action.type).toBe('start');
          expect(action).toHaveProperty(['payload', 'position'], 200);
        });
      });
    });
  });

  describe('when move action', () => {
    describe('when mousemove event', () => {
      beforeEach(() => {
        event = new MouseEvent('mousemove', {
          screenX: 100,
          screenY: 200,
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get move action, position from screenY', () => {
          expect(action.type).toBe('move');
          expect(action).toHaveProperty(['payload', 'position'], 200);
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get move action, position from screenX', () => {
          expect(action.type).toBe('move');
          expect(action).toHaveProperty(['payload', 'position'], 100);
        });
      });
    });

    describe('when touchmove event', () => {
      beforeEach(() => {
        event = new TouchEvent('touchmove', {
          touches: [
            {
              screenX: 200,
              screenY: 100,
            } as Touch,
          ],
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get move action, position from touches[0].screenY', () => {
          expect(action.type).toBe('move');
          expect(action).toHaveProperty(['payload', 'position'], 100);
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get move action, position from touches[0].screenX', () => {
          expect(action.type).toBe('move');
          expect(action).toHaveProperty(['payload', 'position'], 200);
        });
      });
    });
  });

  describe('when end action', () => {
    describe('when mouseup event', () => {
      beforeEach(() => {
        event = new MouseEvent('mouseup', {
          screenX: 100,
          screenY: 200,
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get end action', () => {
          expect(action.type).toBe('end');
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get end action', () => {
          expect(action.type).toBe('end');
        });
      });
    });

    describe('when touchend event', () => {
      beforeEach(() => {
        event = new TouchEvent('touchend', {
          touches: [
            {
              screenX: 200,
              screenY: 100,
            } as Touch,
          ],
        });
      });
      describe('when vertical direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('vertical', event);
        });
        it('should get end action', () => {
          expect(action.type).toBe('end');
        });
      });
      describe('when horizontal direction', () => {
        beforeEach(() => {
          action = createActionFromEvent('horizontal', event);
        });
        it('should get end action', () => {
          expect(action.type).toBe('end');
        });
      });
    });
  });
});

describe('resizableReducer', () => {
  let state: IResizableState;
  describe('when init action', () => {
    it('should set size to state', () => {
      expect(
        resizableReducer(
          { direction: 'up' },
          {
            type: 'init',
            payload: {
              size: 100,
            },
          }
        )
      ).toHaveProperty('size', 100);
    });
  });
  describe('when start action', () => {
    it('should set isMove, initSize', () => {
      state = resizableReducer(
        { direction: 'up', size: 150 },
        {
          type: 'start',
          payload: {
            position: 100,
          },
        }
      );
      expect(state.direction).toBe('up');
      expect(state.initSize).toBe(150);
      expect(state.isMove).toBe(true);
    });
  });
  describe('when end action', () => {
    it('should set isMove false', () => {
      state = resizableReducer(
        { direction: 'up', size: 150, isMove: true },
        {
          type: 'end',
        }
      );
      expect(state.direction).toBe('up');
      expect(state.isMove).toBe(false);
    });
  });
  describe('when move action', () => {
    describe('when set minSize', () => {
      beforeEach(() => {
        state = resizableReducer(
          {
            size: 100,
            minSize: 80,
            direction: 'up',
          },
          {
            type: 'start',
            payload: {
              position: 40,
            },
          }
        );
        state = resizableReducer(state, {
          type: 'move',
          payload: {
            position: 100,
          },
        });
      });
      it('should set size not lower then minSize', () => {
        expect(state.size).toBe(80);
      });
    });
    describe('when set maxSize', () => {
      beforeEach(() => {
        state = resizableReducer(
          {
            size: 100,
            maxSize: 150,
            direction: 'down',
          },
          {
            type: 'start',
            payload: {
              position: 40,
            },
          }
        );
        state = resizableReducer(state, {
          type: 'move',
          payload: {
            position: 100,
          },
        });
      });
      it('should set size not upper then maxSize', () => {
        expect(state.size).toBe(150);
      });
    });
    describe('when direction', () => {
      function directionSpec(direction: ResizeDirection) {
        let directionState: IResizableState = {
          size: 100,
          direction,
        };
        directionState = resizableReducer(directionState, {
          type: 'start',
          payload: {
            position: 40,
          },
        });
        return resizableReducer(directionState, {
          type: 'move',
          payload: {
            position: 50,
          },
        });
      }
      describe('when direction is up', () => {
        beforeEach(() => {
          state = directionSpec('up');
        });
        it('should set size minus 10', () => {
          expect(state).toHaveProperty('size', 90);
        });
      });
      describe('when direction is down', () => {
        beforeEach(() => {
          state = directionSpec('down');
        });
        it('should set size up 10', () => {
          expect(state).toHaveProperty('size', 110);
        });
      });
      describe('when direction is left', () => {
        beforeEach(() => {
          state = directionSpec('left');
        });
        it('should set size minus 10', () => {
          expect(state).toHaveProperty('size', 90);
        });
      });
      describe('when direction is right', () => {
        beforeEach(() => {
          state = directionSpec('right');
        });
        it('should set size up 10', () => {
          expect(state).toHaveProperty('size', 110);
        });
      });
    });
  });
});
