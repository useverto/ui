import { PropsWithChildren } from "react";
import styles from "./Page.module.sass";

export default function Page({
  padTop = true,
  children
}: PropsWithChildren<PageProps>) {
  return (
    <div className={styles.Page + (padTop ? " " + styles.PadTop : "")}>
      {children}
    </div>
  );
}

interface PageProps {
  padTop?: boolean;
}
