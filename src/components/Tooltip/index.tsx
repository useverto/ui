import { ReactNode, PropsWithChildren, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultProps, getCssPosition } from "../../utils";
import { FloatingPosition } from "../../types";
import styles from "./Tooltip.module.sass";

export default function Tooltip({
  className,
  children,
  text,
  position = "top",
  arrow,
  style,
  ...props
}: PropsWithChildren<Props>) {
  const [shown, setShown] = useState(false);

  return (
    <div
      className={styles.TooltipWrapper}
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
              styles[`Pos_${position}`],
              className ?? ""
            ]
              .filter((val) => val !== "")
              .join(" ")}
            style={style}
            initial={{ [getCssPosition(position)]: "80%", opacity: 0 }}
            animate={{ [getCssPosition(position)]: "108%", opacity: 1 }}
            exit={{ [getCssPosition(position)]: "80%", opacity: 0 }}
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

interface Props extends DefaultProps {
  text?: ReactNode;
  position?: FloatingPosition;
  arrow?: boolean;
}
