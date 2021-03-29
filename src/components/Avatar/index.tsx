import { MouseEventHandler } from "react";
import { DefaultProps } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Avatar.module.sass";

export default function Avatar({
  className,
  style,
  usertag,
  name,
  avatar,
  onClick,
  href,
  size = "small",
  notification
}: Props) {
  return (
    <a
      className={
        styles.Avatar +
        " " +
        (size !== "small" ? styles[size] : "") +
        " " +
        (className ?? "")
      }
      style={style}
      onClick={onClick}
      href={href}
    >
      <div className={styles.Pfp}>
        <AnimatePresence>
          {notification && (
            <motion.span
              className={styles.Notification}
              initial={{ opacity: 0, scale: 0.45 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.45 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        <img src={avatar} alt={`${usertag}'s avatar`} draggable={false} />
      </div>
      <div>
        <h1>{name}</h1>
        <p>@{usertag}</p>
      </div>
    </a>
  );
}

interface Props extends DefaultProps {
  size?: "small" | "large" | "large-inline";
  usertag: string;
  name: string; // full name
  avatar: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  notification?: boolean;
}
