import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as Close } from "@geist-ui/react-icons";
import styles from "./Note.module.sass";
import { useTheme } from "../Provider/Theme";

export default function Note({
  children,
  type = "default",
  label,
  labelIcon,
  filled = false,
  dismiss = false,
  className,
  ...props
}: PropsWithChildren<NoteProps>) {
  const [labelText, setLabelText] = useState(label),
    [shown, setShown] = useState(true),
    theme = useTheme();

  useEffect(() => {
    if ((type === "default" || type === "primary") && !label)
      setLabelText("Info");
    else if (label) setLabelText(label);
  }, [type, label]);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className={
            [
              "zi-note",
              styles.Note,
              styles[type] ?? type,
              filled
                ? styles.Filled + " " + (styles[`Filled_${type}`] ?? "")
                : "",
              theme === "Dark" ? styles.Dark : ""
            ]
              .filter((val) => val !== "")
              .join(" ") +
            " " +
            (className ?? "")
          }
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.73 }}
          transition={{
            duration: 0.2,
            transitionTimingFunction: "ease-in-out"
          }}
          {...props}
        >
          <span className={"zi-note-type " + styles.Type}>
            {labelIcon && <div className={styles.Icon}>{labelIcon}</div>}
            {labelText ?? type.charAt(0).toUpperCase() + type.slice(1)}:
          </span>
          {children}
          {dismiss && (
            <div className={styles.Dismiss} onClick={() => setShown(false)}>
              <Close />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NoteProps {
  className?: string;
  type?: "default" | "primary" | "success" | "alert" | "error";
  label?: string;
  labelIcon?: ReactNode;
  filled?: boolean;
  dismiss?: boolean;
}
