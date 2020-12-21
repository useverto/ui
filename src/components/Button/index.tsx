import { PropsWithChildren } from "react";
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
  return (
    <button
      className={`zi-btn ${type ?? ""} ${size ?? ""} ${abort ? "abort" : ""} ${
        shadow ? "shadow" : ""
      } ${disabled ? "disabled" : ""} ${loading ? "loading" : ""} ${
        styles.Button
      } ${styles[type] ?? ""} ${code ? styles.code : ""}`}
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
