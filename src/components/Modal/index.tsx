import {
  PropsWithChildren,
  MouseEvent,
  CSSProperties,
  Dispatch,
  SetStateAction,
  useState
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../Provider/Theme";
import styles from "./Modal.module.sass";

export default function Modal({
  children,
  className,
  onClose,
  open = false,
  backdrop = true,
  code,
  style,
  ...props
}: PropsWithChildren<ModalProps>) {
  const theme = useTheme();

  return (
    <>
      <AnimatePresence>
        {backdrop && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.23 }}
            className={
              styles.Backdrop +
              (theme === "Dark" ? ` ${styles.DarkBackdrop}` : "")
            }
            onClick={onClose}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, transform: "translate(-50%, -110%)" }}
            animate={{ opacity: 1, transform: "translate(-50%, -50%)" }}
            exit={{ opacity: 0, transform: "translate(-50%, -90%)" }}
            transition={{ duration: 0.365 }}
            className={
              [
                styles.Modal,
                theme === "Dark" ? styles.Dark : "",
                code ? styles.Code : ""
              ]
                .filter((val) => val !== "")
                .join(" ") + ` ${className ?? ""}`
            }
            style={style}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

Modal.Content = function ({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<ModalContentProps>) {
  const theme = useTheme();

  return (
    <div
      className={
        [styles.Content, theme === "Dark" ? styles.DarkContent : ""]
          .filter((val) => val !== "")
          .join(" ") + ` ${className ?? ""}`
      }
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

Modal.Footer = function ({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<ModalFooterProps>) {
  const theme = useTheme();

  return (
    <div
      className={
        [styles.Footer, theme === "Dark" ? styles.DarkFooter : ""]
          .filter((val) => val !== "")
          .join(" ") + ` ${className ?? ""}`
      }
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

Modal.Action = function ({
  children,
  className,
  onClick,
  passive,
  style,
  ...props
}: PropsWithChildren<ModalActionProps>) {
  const theme = useTheme();

  return (
    <button
      className={
        [
          styles.Action,
          theme === "Dark" ? styles.DarkAction : "",
          passive ? styles.Passive : ""
        ]
          .filter((val) => val !== "")
          .join(" ") + ` ${className ?? ""}`
      }
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export function useModal(open: boolean = false): UseModalData {
  const [state, setState] = useState(open);

  return {
    state,
    setState,
    bindings: {
      open: state,
      onClose: () => setState(false)
    }
  };
}

interface ModalProps {
  open: boolean;
  onClose?: (e?: MouseEvent) => void;
  className?: string;
  backdrop?: boolean;
  code?: boolean;
  style?: CSSProperties;
}

interface ModalContentProps {
  className?: string;
  style?: CSSProperties;
}

interface ModalFooterProps {
  className?: string;
  style?: CSSProperties;
}

interface ModalActionProps {
  className?: string;
  passive?: boolean;
  onClick?: (e?: MouseEvent) => void;
  style?: CSSProperties;
}

interface UseModalData {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: (e?: MouseEvent) => void;
  };
}
