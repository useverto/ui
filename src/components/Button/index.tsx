import { useEffect, useState, PropsWithChildren, MouseEvent } from "react";
import Ripple from "./Ripple";
import styles from "./Button.module.sass";

export default function Button({
  children,
  code,
  type,
  size,
  abort,
  shadow,
  disabled,
  loading,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const [ripple, showRipple] = useState(false),
    [clickLocation, setClickLocation] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0
    });

  function rippleColor() {
    switch (type) {
      case "default":
      case "primary":
        return "rgba(0, 0, 0, .11)";

      case "success":
        return "rgba(159, 0, 237, .11)";

      case "warning":
        return "rgba(245, 166, 35, .11)";

      case "danger":
        return "rgba(238, 0, 0, .11)";
    }
  }

  function startRipple(e: MouseEvent) {
    setClickLocation({ x: e.clientX, y: e.clientY });
    showRipple(true);
  }

  return (
    <button
      className={`
        zi-btn 
        ${type ?? ""} 
        ${size ?? ""} 
        ${abort ? "abort" : ""} 
        ${shadow ? "shadow" : ""} 
        ${disabled ? "disabled" : ""} 
        ${loading ? "loading" : ""} 
        ${styles.Button} 
        ${styles[type] ?? ""} 
        ${code ? styles.code : ""}
      `}
      onClick={startRipple}
      disabled={disabled}
      {...props}
    >
      {(loading && (
        <span className="zi-loading-shim">
          <i></i>
          <i></i>
          <i></i>
        </span>
      )) ||
        children}
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

interface ButtonProps {
  code?: boolean;
  type?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "big" | "mini" | "auto";
  abort?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
