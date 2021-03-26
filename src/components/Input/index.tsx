import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useState
} from "react";
import styles from "./Input.module.sass";

export default function Input({
  className,
  style,
  currency,
  label,
  inlineLabel,
  leftInlineLabel,
  status,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={"VertoInput " + (className ?? "")} style={style}>
      <span className={"VertoInputLabel " + styles.Label}>{label}</span>
      <div
        className={[
          "VertoInputWrapper",
          styles.InputWrapper,
          (currency && styles.WithCurrency) || "",
          (inlineLabel && styles.WithInlineLabel) || "",
          (status && styles[`Status_${status}`]) || ""
        ]
          .filter((val) => val !== "")
          .join(" ")}
      >
        {currency && <span className={styles.Currency}>{currency}</span>}
        {inlineLabel && leftInlineLabel && (
          <div
            className={
              "VertoInputInlineLabel " +
              styles.InlineLabel +
              " " +
              styles.LeftInlineLabel
            }
          >
            {inlineLabel}
          </div>
        )}
        <input {...props} />
        {inlineLabel && !leftInlineLabel && (
          <div className={"VertoInputInlineLabel " + styles.InlineLabel}>
            {inlineLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export function useInput<T extends string | number>(val: T) {
  const [state, setState] = useState<T>(val),
    [status, setStatus] = useState<InputStatus>();

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
      onChange(e: ChangeEvent<HTMLInputElement>) {
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
  value?: string | number;
  min?: string | number;
  max?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  currency?: string;
  label?: ReactNode;
  inlineLabel?: ReactNode;
  leftInlineLabel?: boolean;
  placeholder?: string;
  status?: InputStatus;
  type?: "text" | "number" | "password";
}

type InputStatus = undefined | "error" | "warning" | "success";
