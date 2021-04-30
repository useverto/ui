import {
  AlertIcon,
  CheckIcon,
  FlameIcon,
  InfoIcon,
  XIcon
} from "@primer/octicons-react";
import { useState } from "react";
import { ToastData } from "../../types";
import styles from "./Toast.module.sass";

export default function Toast({
  title,
  description,
  type = "info"
}: ToastData) {
  const [hovered, setHoverd] = useState(false);

  return (
    <div
      className={styles.Toast + " " + styles[`Status_${type}`]}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
    >
      {(hovered && <XIcon />) ||
        (type === "info" && <InfoIcon />) ||
        (type === "error" && <FlameIcon />) ||
        (type === "success" && <CheckIcon />) ||
        (type === "warning" && <AlertIcon />)}
      <div className={styles.Content}>
        <p className={styles.Title}>{title}</p>
        <p className={styles.Description}>{description}</p>
      </div>
    </div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const setToast = (toast: ToastData) =>
    setToasts((val) => ({ ...val, toast }));

  return [toasts, setToast];
}
