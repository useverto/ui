import { PropsWithChildren, MouseEventHandler } from "react";
import { Spinner } from "../Loading";
import { DefaultProps } from "../../utils";
import { useTheme } from "../Provider/theme";
import styles from "./Button.module.sass";

export default function Button({
  children,
  secondary,
  small,
  loading,
  fullWidth = false,
  className,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <button
      className={[
        "VertoButton",
        styles.Button,
        (theme === "Dark" && styles.Dark) || "",
        (secondary && styles.Secondary) || "",
        (small && styles.small) || "",
        (fullWidth && styles.FullWidth) || "",
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
  secondary?: boolean;
  small?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
