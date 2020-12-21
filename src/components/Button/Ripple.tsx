import { useRef, useEffect } from "react";
import styles from "./Button.module.sass";

export default function Ripple({ color, click, completed }: RippleProps) {
  const component = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!component.current) return;

    component.current.addEventListener("animationend", completed);

    return function cleanup() {
      completed();
      if (component.current)
        component.current.removeEventListener("animationend", completed);
    };
  });

  return (
    <div className={styles.Ripple} ref={component}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ top: click.y, left: click.x }}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={color}>
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface RippleProps {
  color: string;
  click: {
    x: number;
    y: number;
  };
  completed: () => any;
}
