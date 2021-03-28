import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  ReactNode,
  useEffect,
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
  matchPattern,
  onChange,
  ...props
}: Props) {
  const [val, setVal] = useState(props.value),
    [inputStatus, setInputStatus] = useState(status),
    [changed, setChanged] = useState(false);

  useEffect(() => {
    if (typeof val !== "string" || !matchPattern || !changed) return;
    if (!val.match(matchPattern)) setInputStatus("error");
    else setInputStatus(undefined);
  }, [val]);

  return (
    <div className={"VertoInput " + (className ?? "")}>
      <span className={"VertoInputLabel " + styles.Label}>
        {label} {props.value}
      </span>
      <div
        className={[
          "VertoInputWrapper",
          styles.InputWrapper,
          (currency && styles.WithCurrency) || "",
          (inlineLabel && styles.WithInlineLabel) || "",
          (inputStatus && styles[`Status_${inputStatus}`]) || ""
        ]
          .filter((val) => val !== "")
          .join(" ")}
        style={style}
      >
        {currency && <span className={styles.Currency}>{currency}</span>}
        {inlineLabel && leftInlineLabel && (
          <div className={"VertoInputInlineLabel " + styles.InlineLabel}>
            {inlineLabel}
          </div>
        )}
        <input
          onChange={(e) => {
            setVal(
              props.type === "number" ? Number(e.target.value) : e.target.value
            );
            setChanged(true);
            if (onChange) onChange(e);
          }}
          {...props}
        />
        {inlineLabel && !leftInlineLabel && (
          <div className={"VertoInputInlineLabel " + styles.InlineLabel}>
            {inlineLabel}
          </div>
        )}
      </div>
    </div>
  );
}

// @ts-ignore
export function useInput<T extends string | number>(val: T = "") {
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
  matchPattern?: RegExp;
  type?: "text" | "number" | "password";
}

type InputStatus = undefined | "error" | "warning" | "success";
