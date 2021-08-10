import { CheckIcon } from "@iconicicons/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useState,
  PropsWithChildren,
  ChangeEventHandler,
  ChangeEvent
} from "react";
import { DefaultProps } from "../../utils";
import { useTheme } from "../Provider/theme";
import styles from "./Checkbox.module.sass";

export default function Checkbox({
  children,
  style,
  className,
  checked = false,
  ...props
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <label
      className={[
        "VertoCheckbox",
        styles.Checkbox,
        theme === "Dark" ? styles.Dark : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
    >
      {children}
      <input type="checkbox" checked={checked} {...props} />
      <span className={styles.Check}>
        <AnimatePresence>
          {checked && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.13, ease: "easeInOut" }}
            >
              <CheckIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </label>
  );
}

export function useCheckbox(checked: boolean = false) {
  const [state, setState] = useState(checked);

  return {
    state,
    setState,
    reset: () => setState(checked),
    bindings: {
      checked: state,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setState(e.target.checked)
    }
  };
}

interface Props extends DefaultProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
