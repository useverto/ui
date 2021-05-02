import { XIcon } from "@primer/octicons-react";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler, PropsWithChildren, useState } from "react";
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
              translateY: "-200%",
              scale: 0.6
            }}
            animate={{
              opacity: 1,
              translateX: "-50%",
              translateY: "-50%",
              scale: 1
            }}
            exit={{
              opacity: 0,
              translateX: "-50%",
              translateY: "100%",
              scale: 0.6
            }}
            className={[styles.Modal, className ?? ""]
              .filter((val) => val !== "")
              .join(" ")}
            style={style}
            transition={{ duration: 0.23, ease: "easeInOut" }}
          >
            <div className={styles.Close} onClick={onClose}>
              <XIcon />
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
