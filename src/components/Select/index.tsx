import { ChevronDownIcon } from "@iconicicons/react";
import {
  PropsWithChildren,
  ReactNode,
  ChangeEventHandler,
  useState,
  ChangeEvent
} from "react";
import { useTheme } from "../Provider/theme";
import { DefaultProps } from "../../utils";
import styles from "./Select.module.sass";

export default function Select({
  children,
  label,
  className,
  style,
  filled,
  small,
  status,
  ...props
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <div
      className={["VertoSelect", className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
    >
      {label && (
        <span
          className={
            "VertoSelectLabel " +
            styles.Label +
            ((small && " " + styles.SmallLabel) || "")
          }
        >
          {label}
        </span>
      )}
      <div
        className={[
          "VertoSelectWrapper",
          styles.Select,
          (filled && styles.Filled) || "",
          (small && styles.Small) || "",
          (status && styles[`Status_${status}`]) || "",
          (theme === "Dark" && styles.Dark) || ""
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
  const [state, setState] = useState<T>(val),
    [status, setStatus] = useState<SelectStatus>();

  return {
    state,
    setState,
    setStatus,
    reset() {
      setState(val);
      setStatus(undefined);
    },
    bindings: {
      value: state,
      status,
      onChange(e: ChangeEvent<HTMLSelectElement>) {
        setState(
          // @ts-ignore
          typeof state === "string" ? e.target.value : Number(e.target.value)
        );
      }
    }
  };
}

interface Props extends DefaultProps {
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label?: ReactNode;
  filled?: boolean;
  small?: boolean;
  status?: SelectStatus;
}

type SelectStatus = undefined | "error" | "warning" | "success";
