import { useEffect, useState, PropsWithChildren } from "react";
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
  const [ripple, showRipple] = useState(false);

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
      onClick={() => showRipple(true)}
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
          click={{ x: 0, y: 0 }}
          color="#fff"
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
