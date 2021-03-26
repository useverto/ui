import { ChevronDownIcon } from "@primer/octicons-react";
import {
  PropsWithChildren,
  CSSProperties,
  ReactNode,
  ChangeEventHandler
} from "react";
import styles from "./Select.module.sass";

export default function Select({
  children,
  label,
  className,
  style,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={"VertoSelect " + (className ?? "")} style={style}>
      {label && (
        <span className={"VertoSelectLabel " + styles.Label}>{label}</span>
      )}
      <div className={"VertoSelectWrapper " + styles.Select}>
        <select {...props}>{children}</select>
        <span className={"VertoSelectArrow " + styles.Arrow}>
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label?: ReactNode;
}
