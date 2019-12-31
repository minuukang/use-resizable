import * as React from "react";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import useResizable from "../src/index";
import { IResizableOption, directionGroupMap } from "../src/types";

function TestResizable(options: IResizableOption) {
  const { size, ref, handler } = useResizable(options);
  const group = directionGroupMap[options.direction];
  return (
    <div
      className="wrapper"
      style={{ [group === "horizontal" ? "width" : "height"]: size }}
      ref={ref}
    >
      <div className="handler" onMouseDown={handler} />
    </div>
  );
}

describe("useResizable", () => {
  let renderer: ReactTestRenderer;
  describe("direction is down (vertical)", () => {
    beforeEach(async () => {
      renderer = create(<TestResizable size={500} direction={"down"} />);
      act(() => {
        renderer.root.findByProps({ className: "handler" }).props.onMouseDown({
          nativeEvent: new MouseEvent("mousedown", {
            screenX: 100,
            screenY: 100
          })
        });
      });
      act(() => {
        window.dispatchEvent(
          new MouseEvent("mousemove", {
            screenX: 150,
            screenY: 150
          })
        );
      });
    });
    it("should size be upper 50", () => {
      expect(
        renderer.root.findByProps({ className: "wrapper" }).props.style.height
      ).toBe(550);
    });
  });

  describe("direction is up (vertical)", () => {
    beforeEach(async () => {
      renderer = create(<TestResizable size={500} direction={"up"} />);
      act(() => {
        renderer.root.findByProps({ className: "handler" }).props.onMouseDown({
          nativeEvent: new MouseEvent("mousedown", {
            screenX: 100,
            screenY: 100
          })
        });
      });
      act(() => {
        window.dispatchEvent(
          new MouseEvent("mousemove", {
            screenX: 150,
            screenY: 150
          })
        );
      });
    });
    it("should size be lower 50", () => {
      expect(
        renderer.root.findByProps({ className: "wrapper" }).props.style.height
      ).toBe(450);
    });
  });

  describe("direction is right (horizontal)", () => {
    beforeEach(async () => {
      renderer = create(<TestResizable size={500} direction={"right"} />);
      act(() => {
        renderer.root.findByProps({ className: "handler" }).props.onMouseDown({
          nativeEvent: new MouseEvent("mousedown", {
            screenX: 100,
            screenY: 100
          })
        });
      });
      act(() => {
        window.dispatchEvent(
          new MouseEvent("mousemove", {
            screenX: 150,
            screenY: 150
          })
        );
      });
    });
    it("should size be upper 50", () => {
      expect(
        renderer.root.findByProps({ className: "wrapper" }).props.style.width
      ).toBe(550);
    });
  });

  describe("direction is left (horizontal)", () => {
    beforeEach(async () => {
      renderer = create(<TestResizable size={500} direction={"left"} />);
      act(() => {
        renderer.root.findByProps({ className: "handler" }).props.onMouseDown({
          nativeEvent: new MouseEvent("mousedown", {
            screenX: 100,
            screenY: 100
          })
        });
      });
      act(() => {
        window.dispatchEvent(
          new MouseEvent("mousemove", {
            screenX: 150,
            screenY: 150
          })
        );
      });
    });
    it("should size be lower 50", () => {
      expect(
        renderer.root.findByProps({ className: "wrapper" }).props.style.width
      ).toBe(450);
    });
  });
});
