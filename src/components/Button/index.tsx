import { PropsWithChildren, MouseEventHandler } from "react";
import { Spinner } from "../Loading";
import { DefaultProps } from "../../utils";
import { useTheme } from "../Provider/theme";
import styles from "./Button.module.sass";

export default function Button({
  children,
  type = "filled",
  small,
  loading,
  className,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <button
      className={[
        styles.Button,
        (theme === "Dark" && styles.Dark) || "",
        (type !== "filled" && styles[type]) || "",
        (small && styles.small) || "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      onClick={onClick}
      {...props}
    >
      {(loading && <Spinner className={styles.Loading} />) || children}
    </button>
  );
}

interface Props extends DefaultProps {
  type?: "filled" | "outlined" | "secondary";
  small?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
