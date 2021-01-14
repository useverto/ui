import { PropsWithChildren, CSSProperties, MouseEvent } from "react";
import { useTheme } from "../Provider/Theme";
import styles from "./Loading.module.sass";

export function Dots({
  className,
  children,
  style,
  onClick,
  ...props
}: PropsWithChildren<LoadingProps>) {
  return (
    <span
      className={"zi-loading-shim " + (className ?? "")}
      style={style}
      onClick={onClick}
      {...props}
    >
      <i></i>
      <i></i>
      <i></i>
      {children}
    </span>
  );
}

export function Spinner({
  className,
  children,
  style,
  onClick,
  ...props
}: PropsWithChildren<LoadingProps>) {
  const theme = useTheme();

  return (
    <div
      className={
        [styles.Spinner, theme === "Dark" ? styles.DarkSpinner : ""]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      style={style}
      onClick={onClick}
      {...props}
    >
      <svg viewBox="22 22 44 44">
        <circle
          className={styles.Circle}
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        />
      </svg>
      {children}
    </div>
  );
}

export function Skeleton({
  className,
  children,
  style,
  onClick,
  ...props
}: PropsWithChildren<LoadingProps>) {
  const theme = useTheme();

  return (
    <div
      className={
        [styles.Skeleton, theme === "Dark" ? styles.DarkSkeleton : ""]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

interface LoadingProps {
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent) => void;
}
