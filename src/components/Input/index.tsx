import {
  PropsWithChildren,
  ChangeEventHandler,
  ReactNode,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  CSSProperties,
  Dispatch,
  SetStateAction
} from "react";
import { X as Clear } from "@geist-ui/react-icons";
import styles from "./Input.module.sass";
import { useTheme } from "../Provider/Theme";

export default function Input({
  children,
  className,
  value,
  label,
  rightLabel,
  type = "text",
  min,
  max,
  disabled,
  theme,
  readOnly,
  icon,
  onChange,
  clearButton,
  code,
  reverse,
  bold,
  style,
  ...props
}: PropsWithChildren<InputProps>) {
  const [val, setVal] = useState(value),
    displayTheme = useTheme(),
    inputEl = useRef<HTMLInputElement>();

  useEffect(() => setVal(value), [value]);

  function change(e: ChangeEvent<HTMLInputElement>) {
    setVal(e.target.value);
    if (onChange) onChange(e);
  }

  function focusInput() {
    if (!inputEl.current) return;
    inputEl.current.focus();
  }

  return (
    <>
      {label && label !== "" && bold && (
        <div className={styles.BoldLabel}>
          <span>{label}</span>
          {rightLabel && rightLabel !== "" && <span>{rightLabel}</span>}
        </div>
      )}
      <div
        className={
          [
            styles.Input,
            code ? styles.Code : "",
            displayTheme === "Dark" || reverse ? styles.Dark : "",
            disabled ? styles.Disabled : "",
            theme ? styles[`Theme_${theme}`] ?? "" : "",
            reverse ? styles.Reverse : "",
            bold ? styles.Bold : ""
          ]
            .filter((val) => val !== "")
            .join(" ") +
          " " +
          (className ?? "")
        }
        style={style}
        {...props}
      >
        {icon && (
          <div className={styles.Icon} onClick={focusInput}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={val ?? ""}
          onChange={change}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          ref={inputEl}
        />
        {label && label !== "" && !bold && (
          <span
            onClick={focusInput}
            className={[
              styles.Label,
              val && val !== "" ? styles.HasContent : ""
            ]
              .filter((val) => val !== "")
              .join(" ")}
          >
            {label}
          </span>
        )}
        {clearButton && (
          <div className={styles.ActionButton} onClick={() => setVal("")}>
            <Clear />
          </div>
        )}
        {children && <div className={styles.InputChildren}>{children}</div>}
      </div>
    </>
  );
}

export function useInput(val: string | number): UseInputData {
  const [state, setState] = useState<string | number>(val);

  return {
    state,
    setState,
    reset: () => setState(val),
    bindings: {
      value: state,
      onChange(e: ChangeEvent<HTMLInputElement>) {
        setState(e.target.value);
      }
    }
  };
}

interface InputProps {
  className?: string;
  value?: string | number;
  label?: string;
  rightLabel?: string;
  type?: "password" | "email" | "text" | "number";
  disabled?: boolean;
  theme?: "default" | "error" | "success" | "warning";
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  clearButton?: boolean;
  code?: boolean;
  reverse?: boolean;
  bold?: boolean;
  min?: number;
  max?: number;
  style?: CSSProperties;
}

interface UseInputData {
  state: string | number;
  setState: Dispatch<SetStateAction<string | number>>;
  reset: () => void;
  bindings: {
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
}
