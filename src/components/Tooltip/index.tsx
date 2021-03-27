import { ReactNode, CSSProperties, PropsWithChildren, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Tooltip.module.sass";

export default function Tooltip({
  className,
  children,
  text,
  position = "top",
  arrow,
  ...props
}: PropsWithChildren<Props>) {
  const [shown, setShown] = useState(false);

  const getCssPosition = () =>
    position === "top"
      ? "bottom"
      : position === "bottom"
      ? "top"
      : position === "left"
      ? "right"
      : "left";

  return (
    <div
      className={styles.TooltipWrapper + " " + (className ?? "")}
      {...props}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <AnimatePresence>
        {shown && (
          <motion.div
            className={[
              "VertoTooltip",
              styles.Tooltip,
              ((position === "right" || position === "left") && styles.Side) ||
                "",
              (arrow && styles.WithArrow) || "",
              styles[`Pos_${position}`]
            ]
              .filter((val) => val !== "")
              .join(" ")}
            initial={{ [getCssPosition()]: "80%", opacity: 0 }}
            animate={{ [getCssPosition()]: "108%", opacity: 1 }}
            exit={{ [getCssPosition()]: "80%", opacity: 0 }}
            transition={{ duration: 0.23, ease: "easeInOut" }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  text?: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
}
