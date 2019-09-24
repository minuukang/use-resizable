# use-resizable
get resize value use react-hook from mousedown, mousemove, mouseup event (avaible touch event)

## demo

https://codesandbox.io/s/funny-mcnulty-4f1j0

## usage

```ts
import * as React from "react";
import useResizable from "use-resizable";

function Layout({ children }: React.PropsWithChildren<{}>) {
  const { size, handler } = useResizable({
    minSize: 300,
    maxSize: 600,
    width: 400,
    direction: "left", // size scale direction
  });
  return (
    <div style={{ width: size, position: "relative" }}>
      {children}
      <div
        style={{
          position: "absolute",
          left: "-5px",
          top: 0,
          height: "100%",
          width: "10px",
          cursor: "col-resize"
        }}
        onMouseDown={handler}
        onTouchStart={handler}
      />
    </div>
  );
}
```
