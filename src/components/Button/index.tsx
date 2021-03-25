import { PropsWithChildren } from "react";
import { Spinner } from "../Loading";
import styles from "./Button.module.sass";

export default function Button({
  children,
  type = "filled",
  small,
  loading,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={
        [
          styles.Button,
          (type !== "filled" && styles[type]) || "",
          (small && styles.small) || ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
    >
      {(loading && <Spinner className={styles.Loading} />) || children}
    </button>
  );
}

interface Props {
  type?: "filled" | "outlined" | "secondary";
  small?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}
