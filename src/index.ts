import * as React from "react";
import { IResizableOption, directionGroupMap, windowEventTypes } from "./types";
export { IResizableOption } from "./types";
import { useResizableReducer, getPositionFromMouseOrTouch } from "./reducer";

export default function useResizable(option: IResizableOption) {
  const ref = React.useRef<HTMLElement & HTMLDivElement>(null);
  const [state, actions] = useResizableReducer(option);
  const group = directionGroupMap[state.direction];
  const handleStartMove = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      actions.start({
        position: getPositionFromMouseOrTouch(group, event.nativeEvent)
      });
    },
    [group, actions.start]
  );
  React.useEffect(() => {
    if (!option.size && ref.current) {
      actions.init({
        size:
          group === "vertical"
            ? ref.current.offsetHeight
            : ref.current.offsetWidth
      });
    }
  }, [option.size, group]);
  React.useEffect(() => {
    const dispatchEvent = (event: MouseEvent | TouchEvent) => {
      if (event.type.includes("move")) {
        actions.move({
          position: getPositionFromMouseOrTouch(group, event)
        });
      } else {
        actions.end();
      }
    };
    if (state.isMove) {
      windowEventTypes.forEach(type =>
        window.addEventListener(type, dispatchEvent)
      );
      document.body.style.userSelect = "none";
      document.body.style.cursor =
        group === "vertical" ? "row-resize" : "col-resize";
    }
    return () => {
      windowEventTypes.forEach(type =>
        window.removeEventListener(type, dispatchEvent)
      );
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [state.isMove, group]);
  return {
    ref,
    size: state.size,
    handler: handleStartMove
  };
}
