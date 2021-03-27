import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Card.module.sass";

export default function Card({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={"VertoCard " + styles.Card} {...props}>
      {children}
    </div>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
}
