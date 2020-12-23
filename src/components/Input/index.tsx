import {
  PropsWithChildren,
  ChangeEventHandler,
  ReactNode,
  ChangeEvent,
  useState
} from "react";
import { X as Clear } from "@geist-ui/react-icons";
import styles from "./Input.module.sass";

export default function Input({
  children,
  className,
  value,
  label,
  type = "text",
  disabled,
  style,
  readOnly,
  icon,
  onChange,
  clearButton,
  code,
  ...props
}: PropsWithChildren<InputProps>) {
  const [val, setVal] = useState(value);

  function change(e: ChangeEvent<HTMLInputElement>) {
    setVal(e.target.value);
    if (onChange) onChange(e);
  }

  return (
    <div
      className={
        [styles.Input, code ? styles.Code : ""]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        className
      }
      {...props}
    >
      {icon && <div className={styles.Icon}>{icon}</div>}
      <input
        type={type}
        value={value}
        onChange={change}
        disabled={disabled}
        readOnly={readOnly}
      />
      {label && (
        <span
          className={[styles.Label, val && val !== "" ? styles.HasContent : ""]
            .filter((val) => val !== "")
            .join(" ")}
        >
          {label}
        </span>
      )}
      {clearButton && (
        <div className={styles.ClearButton}>
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
  style?: "default" | "error" | "success" | "warning";
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  clearButton?: boolean;
  code?: boolean;
}
