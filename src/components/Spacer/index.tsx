import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Spacer.module.sass";

export default function Spacer({
  className,
  style,
  x,
  y,
  inline,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span
      className={
        "VertoSpacer " +
        styles.Spacer +
        " " +
        (inline ? styles.Inline : "") +
        " " +
        (className ?? "")
      }
      style={{
        marginRight: x !== undefined ? `${x}em` : undefined,
        marginBottom: y !== undefined ? `${y}em` : undefined,
        ...style
      }}
      {...props}
    />
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  x?: number;
  y?: number;
  inline?: boolean;
}
