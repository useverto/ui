import { MouseEventHandler, useEffect, useState } from "react";
import { DefaultProps } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { generateAvatarGradient } from "../../utils";
import Tooltip from "../Tooltip";
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
  left,
  displaytag,
  verified = false,
  onlyProfilePicture = false
}: Props) {
  const router = useRouter();
  const [gradient, setGradient] =
    useState<ReturnType<typeof generateAvatarGradient>>();

  useEffect(
    () => setGradient(generateAvatarGradient(name || usertag || "")),
    [name, usertag]
  );

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
      {left && size === "small" && !onlyProfilePicture && (
        <div className={styles.LeftInfo}>
          <h1 className={verified ? styles.VerifiedWrapper : ""}>
            {name || ""}
            {verified && <VerifiedIcon />}
          </h1>
          <p>@{displaytag ?? usertag}</p>
        </div>
      )}
      <div
        className={
          styles.Pfp +
          " " +
          (left ? styles.RightPfp : "") +
          " " +
          (onlyProfilePicture ? styles.OnlyProfilePicture : "")
        }
      >
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
        {(avatar && <img src={avatar} alt="" draggable={false} />) || (
          <div
            className={styles.Gradient}
            style={{ background: gradient?.gradient ?? "" }}
          >
            <span>{(name || usertag || "").charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      {(!left || size === "large") && !onlyProfilePicture && (
        <div>
          <h1 className={verified ? styles.VerifiedWrapper : ""}>
            {name || ""}
            {verified && <VerifiedIcon />}
          </h1>
          <p>@{displaytag ?? usertag}</p>
        </div>
      )}
    </div>
  );
}

interface Props extends DefaultProps {
  size?: "small" | "large" | "large-inline";
  usertag: string;
  displaytag?: string;
  name: string; // full name
  avatar?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  href?: string;
  notification?: boolean;
  left?: boolean;
  verified?: boolean;
  onlyProfilePicture?: boolean;
}

const VerifiedIcon = () => (
  <div className={styles.Verified}>
    <Tooltip text={"Verified on ArVerify"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
        ></path>
      </svg>
    </Tooltip>
  </div>
);
