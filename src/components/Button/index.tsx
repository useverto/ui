import { PropsWithChildren } from "react";
import styles from "./Button.module.sass";

export default function Button({
  children,
  type = "filled",
  size = "normal",
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={
        [styles.Button].filter((val) => val !== "").join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
    >
      {children}
    </button>
  );
}

interface Props {
  type?: "filled" | "outlined" | "secondary";
  size?: "normal" | "small";
  className?: string;
}
