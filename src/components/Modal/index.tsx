import { CloseIcon } from "@iconicicons/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState
} from "react";
import { DefaultProps } from "../../utils";
import styles from "./Modal.module.sass";

export default function Modal({
  open,
  onClose,
  style,
  className,
  children
}: PropsWithChildren<Props>) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.Backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              translateX: "-50%",
              translateY: "-55%"
            }}
            animate={{
              opacity: 1,
              translateX: "-50%",
              translateY: "-50%"
            }}
            exit={{
              opacity: 0,
              translateY: "-45%"
            }}
            className={[styles.Modal, className ?? ""]
              .filter((val) => val !== "")
              .join(" ")}
            style={style}
            transition={{ duration: 0.23, ease: "easeInOut" }}
          >
            <div className={styles.Close} onClick={onClose}>
              <CloseIcon />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface Props extends DefaultProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLDivElement>;
}

export function useModal(visibleInitially = false) {
  const [state, setState] = useState(visibleInitially);

  // disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflowY = state ? "hidden" : "auto";
  }, [state]);

  return {
    state,
    setState,
    bindings: {
      open: state,
      onClose: () => setState(false)
    }
  };
}

Modal.Title = ({
  children,
  style,
  className
}: PropsWithChildren<DefaultProps>) => (
  <h1
    className={[styles.ModalTitle, className ?? ""]
      .filter((val) => val !== "")
      .join(" ")}
    style={style}
  >
    {children}
  </h1>
);

Modal.Content = ({
  children,
  style,
  className
}: PropsWithChildren<DefaultProps>) => (
  <div
    className={[styles.ModalContent, className ?? ""]
      .filter((val) => val !== "")
      .join(" ")}
    style={style}
  >
    {children}
  </div>
);
