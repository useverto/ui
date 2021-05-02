import {
  AlertIcon,
  CheckIcon,
  FlameIcon,
  InfoIcon,
  XIcon
} from "@primer/octicons-react";
import { MouseEventHandler, useState } from "react";
import { ToastData } from "../../types";
import { motion } from "framer-motion";
import styles from "./Toast.module.sass";

type Props = Omit<ToastData, "duration"> & {
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Toast({
  title,
  description,
  type = "info",
  onClick
}: Props) {
  const [hovered, setHoverd] = useState(false);

  return (
    <motion.div
      className={styles.Toast + " " + styles[`Status_${type}`]}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0.4, height: 0, scale: 0 }}
      transition={{ ease: "easeInOut", duration: 0.17 }}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.Icon}
        key={(hovered && "hovered") || type}
        transition={{ ease: "easeInOut", duration: 0.23 }}
      >
        {(hovered && <XIcon />) ||
          (type === "info" && <InfoIcon />) ||
          (type === "error" && <FlameIcon />) ||
          (type === "success" && <CheckIcon />) ||
          (type === "warning" && <AlertIcon />)}
      </motion.div>
      <div className={styles.Content}>
        <p className={styles.Title}>{title}</p>
        <p className={styles.Description}>{description}</p>
      </div>
    </motion.div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const setToast = (toast: ToastData) =>
    setToasts((val) => ({ ...val, toast }));

  return [toasts, setToast];
}
