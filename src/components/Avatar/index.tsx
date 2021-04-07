import { MouseEventHandler } from "react";
import { DefaultProps } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
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
  notification,
  left
}: Props) {
  const router = useRouter();

  return (
    <div
      className={[
        styles.Avatar,
        size !== "small" ? styles[size] : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={(e) => {
        if (href) router.push(href);
        if (onClick) onClick(e);
      }}
    >
      {left && size === "small" && (
        <div className={styles.LeftInfo}>
          <h1>{name}</h1>
          <p>@{usertag}</p>
        </div>
      )}
      <div className={styles.Pfp + " " + (left ? styles.RightPfp : "")}>
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
      {(!left || size === "large") && (
        <div>
          <h1>{name}</h1>
          <p>@{usertag}</p>
        </div>
      )}
    </div>
  );
}

interface Props extends DefaultProps {
  size?: "small" | "large" | "large-inline";
  usertag: string;
  name: string; // full name
  avatar: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  href?: string;
  notification?: boolean;
  left?: boolean;
}
