import { ChevronDownIcon } from "@primer/octicons-react";
import {
  PropsWithChildren,
  CSSProperties,
  ReactNode,
  ChangeEventHandler,
  useState,
  ChangeEvent
} from "react";
import styles from "./Select.module.sass";

export default function Select({
  children,
  label,
  className,
  style,
  filled,
  small,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={"VertoSelect " + (className ?? "")} style={style}>
      {label && (
        <span className={"VertoSelectLabel " + styles.Label}>{label}</span>
      )}
      <div
        className={[
          "VertoSelectWrapper",
          styles.Select,
          (filled && styles.Filled) || "",
          (small && styles.Small) || ""
        ]
          .filter((val) => val !== "")
          .join(" ")}
      >
        <select {...props}>{children}</select>
        <span className={"VertoSelectArrow " + styles.Arrow}>
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
}

// @ts-ignore
export function useSelect<T extends string | number>(val: T = "") {
  const [state, setState] = useState<T>(val);

  return {
    state,
    setState,
    reset: () => setState(val),
    bindings: {
      value: state,
      onChange(e: ChangeEvent<HTMLSelectElement>) {
        setState(
          // @ts-ignore
          typeof state === "string" ? e.target.value : Number(e.target.value)
        );
      }
    }
  };
}

interface Props {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label?: ReactNode;
  filled?: boolean;
  small?: boolean;
}
