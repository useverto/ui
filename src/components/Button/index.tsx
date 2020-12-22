import {
  useRef,
  useState,
  PropsWithChildren,
  MouseEvent,
  ReactNode
} from "react";
import Ripple from "./Ripple";
import styles from "./Button.module.sass";
import { useTheme } from "../Provider/Theme";

export default function Button({
  children,
  code,
  type,
  size,
  abort,
  shadow,
  disabled,
  loading,
  reverse,
  effect = true,
  icon,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const [ripple, showRipple] = useState(false),
    [clickLocation, setClickLocation] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0
    }),
    component = useRef<HTMLButtonElement>(),
    theme = useTheme();

  function rippleColor() {
    switch (type) {
      case "default":
      case "primary":
        return theme === "Dark" || reverse
          ? "rgba(255, 255, 255, .11)"
          : "rgba(0, 0, 0, .11)";

      case "success":
        return "rgba(159, 0, 237, .11)";

      case "warning":
        return "rgba(245, 166, 35, .11)";

      case "danger":
        return "rgba(238, 0, 0, .11)";
    }
  }

  function startRipple(e: MouseEvent) {
    if (!component.current || !effect || shadow) return;
    const bounding = component.current.getBoundingClientRect();

    setClickLocation({
      x: e.clientX - bounding.left,
      y: e.clientY - bounding.top
    });
    showRipple(true);
  }

  return (
    <button
      ref={component}
      className={
        [
          "zi-btn",
          type ?? "",
          size ?? "",
          abort ? "abort" : "",
          shadow ? "shadow" : "",
          disabled ? "diabled" : "",
          loading ? "loading" : "",
          styles.Button,
          styles[type] ?? "",
          reverse ? styles.reverse : "",
          code ? styles.code : "",
          loading ? styles.loading : "",
          shadow ? styles.shadow : "",
          icon ? styles.iconButton : "",
          theme === "Dark" ? styles.ButtonThemeDark : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      onClick={startRipple}
      disabled={disabled}
      {...props}
    >
      {(loading && (
        <span className={"zi-loading-shim " + styles.LoadingAnimation}>
          <i></i>
          <i></i>
          <i></i>
        </span>
      )) ||
        children}
      {icon && <div className={styles.icon}>{icon}</div>}
      {ripple && (
        <Ripple
          click={clickLocation}
          color={rippleColor()}
          completed={() => showRipple(false)}
        />
      )}
    </button>
  );
}

Button.Icon = function ({
  children,
  className
}: PropsWithChildren<IconButtonProps>) {
  const theme = useTheme();

  return (
    <button
      className={
        [styles.IconButton, theme === "Dark" ? styles.DarkIconButton : ""]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
    >
      {children}
    </button>
  );
};

interface ButtonProps {
  code?: boolean;
  type?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "big" | "mini" | "auto";
  abort?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  effect?: boolean;
  reverse?: boolean;
  icon?: ReactNode;
  className?: string;
}

interface IconButtonProps {
  className?: string;
}
