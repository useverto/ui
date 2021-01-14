import { PropsWithChildren, CSSProperties } from "react";
import styles from "./Page.module.sass";

export default function Page({
  padTop = true,
  children,
  className,
  style,
  ...props
}: PropsWithChildren<PageProps>) {
  return (
    <div
      className={
        styles.Page +
        (padTop ? " " + styles.PadTop : "") +
        " " +
        (className ?? "")
      }
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageProps {
  padTop?: boolean;
  className?: string;
  style?: CSSProperties;
}
