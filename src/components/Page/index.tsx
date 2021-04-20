import { PropsWithChildren } from "react";
import { DefaultProps } from "../../utils";
import { motion } from "framer-motion";
import styles from "./Page.module.sass";

export default function Page({
  children,
  className,
  style,
  size = "normal",
  ...props
}: PropsWithChildren<Props>) {
  return (
    <motion.div
      className={[styles.Page, styles[`Size_${size}`], className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      {...props}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

interface Props extends DefaultProps {
  size?: "large" | "normal" | "small";
}
