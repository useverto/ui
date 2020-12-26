import { PropsWithChildren } from "react";
import styles from "./Table.module.sass";

export default function Table({
  children,
  className,
  code = false,
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
      {...props}
    >
      {children}
    </table>
  );
}

interface TableProps {
  className?: string;
  code?: boolean;
}
