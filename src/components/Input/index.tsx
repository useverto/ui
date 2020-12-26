import {
  PropsWithChildren,
  ChangeEventHandler,
  ReactNode,
  ChangeEvent,
  useState,
  useEffect,
  useRef
} from "react";
import { X as Clear } from "@geist-ui/react-icons";
import styles from "./Input.module.sass";
import { useTheme } from "../Provider/Theme";

export default function Input({
  children,
  className,
  value,
  label,
  type = "text",
  disabled,
  theme,
  readOnly,
  icon,
  onChange,
  clearButton,
  code,
  reverse,
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
    <div
      className={
        [
          styles.Input,
          code ? styles.Code : "",
          displayTheme === "Dark" || reverse ? styles.Dark : "",
          disabled ? styles.Disabled : "",
          theme ? styles[`Theme_${theme}`] ?? "" : "",
          reverse ? styles.Reverse : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
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
        ref={inputEl}
      />
      {label && label !== "" && (
        <span
          onClick={focusInput}
          className={[styles.Label, val && val !== "" ? styles.HasContent : ""]
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
    </div>
  );
}

interface InputProps {
  className?: string;
  value?: string;
  label?: string;
  type?: "password" | "email" | "text";
  disabled?: boolean;
  theme?: "default" | "error" | "success" | "warning";
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  clearButton?: boolean;
  code?: boolean;
  reverse?: boolean;
}
