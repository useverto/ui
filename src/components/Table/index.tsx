import { PropsWithChildren, CSSProperties } from "react";
import styles from "./Table.module.sass";

export default function Table({
  children,
  className,
  code = false,
  style,
  ...props
}: PropsWithChildren<TableProps>) {
  return (
    <table
      className={
        [code ? styles.Table : "zi-table"]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      style={style}
      {...props}
    >
      {children}
    </table>
  );
}

interface TableProps {
  className?: string;
  code?: boolean;
  style?: CSSProperties;
}
