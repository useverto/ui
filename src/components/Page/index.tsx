import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Page.module.sass";

export default function Page({
  children,
  className,
  style,
  size = "normal",
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      className={
        styles.Page + " " + styles[`Size_${size}`] + " " + (className ?? "")
      }
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  size?: "large" | "normal" | "small";
}