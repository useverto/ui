import {
  ChangeEvent,
  KeyboardEventHandler,
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useState
} from "react";
import { DefaultProps } from "../../utils";
import { useTheme } from "../Provider/theme";
import styles from "./Input.module.sass";

export default function Input({
  className,
  style,
  currency,
  label,
  small,
  inlineLabel,
  leftInlineLabel,
  status,
  matchPattern,
  onChange,
  onKeyPressHandler,
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

  useEffect(() => setVal(props.value), [props.value]);
  useEffect(() => setInputStatus(status), [status]);

  const theme = useTheme();

  return (
    <div
      className={["VertoInput", className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
    >
      <span
        className={
          small
            ? "VertoInputLabel " + styles.SmallLabel
            : "VertoInputLabel " + styles.Label
        }
      >
        {label}
      </span>
      <div
        className={[
          "VertoInputWrapper",
          styles.InputWrapper,
          (small && styles.WithSmall) || "",
          (currency && styles.WithCurrency) || "",
          (inlineLabel && styles.WithInlineLabel) || "",
          (inputStatus && styles[`Status_${inputStatus}`]) || "",
          (theme === "Dark" && styles.Dark) || ""
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
          onKeyPress={onKeyPressHandler}
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

interface Props extends DefaultProps {
  value?: string | number;
  min?: string | number;
  max?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  small?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPressHandler?: KeyboardEventHandler<HTMLInputElement>;
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
