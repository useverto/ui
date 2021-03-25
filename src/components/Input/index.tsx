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
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={"VertoInput " + (className ?? "")} style={style}>
      <span className={styles.Label}>{label}</span>
      <div
        className={[
          "VertoInputWrapper",
          styles.InputWrapper,
          (currency && styles.WithCurrency) || "",
          (inlineLabel && styles.WithInlineLabel) || ""
        ]
          .filter((val) => val !== "")
          .join(" ")}
      >
        {currency && <span className={styles.Currency}>{currency}</span>}
        {inlineLabel && leftInlineLabel && (
          <div className={styles.InlineLabel + " " + styles.LeftInlineLabel}>
            {inlineLabel}
          </div>
        )}
        <input {...props} />
        {inlineLabel && !leftInlineLabel && (
          <div className={styles.InlineLabel}>{inlineLabel}</div>
        )}
      </div>
    </div>
  );
}

export function useInput(val: string | number) {
  const [state, setState] = useState(val);

  return {
    state,
    setState,
    reset: () => setState(val),
    bindings: {
      value: state,
      onChange(e: ChangeEvent<HTMLInputElement>) {
        setState(
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
  type?: "text" | "number" | "password";
}
