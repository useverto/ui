import { AnimatePresence, motion } from "framer-motion";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { FloatingPosition } from "../../types";
import { DefaultProps, getCssPosition } from "../../utils";
import styles from "./Popover.module.sass";

export default function Popover({
  children,
  content,
  style,
  className,
  mode = "click",
  position = "top"
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false),
    popoverWrapper = useRef<HTMLDivElement>();

  useEffect(() => {
    document.addEventListener("mousedown", handleClicks);

    return () => {
      document.removeEventListener("mousedown", handleClicks);
    };
  });

  function handleClicks(e: MouseEvent) {
    if (!open || mode !== "click") return;
    if (
      !popoverWrapper.current ||
      popoverWrapper.current.contains(e.target as Node)
    )
      return;
    setOpen(false);
  }

  return (
    <div
      className={"VertoPopoverWrapper " + styles.PopoverWrapper}
      onClick={() => {
        if (mode === "click") setOpen(true);
      }}
      onMouseEnter={() => {
        if (mode === "hover") setOpen(true);
      }}
      onMouseLeave={() => {
        if (mode === "hover") setOpen(false);
      }}
      ref={popoverWrapper}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className={["VertoPopover", styles.Popover, className ?? ""]
              .filter((val) => val !== "")
              .join(" ")}
            style={style}
            initial={{ [getCssPosition(position)]: "80%", opacity: 0 }}
            animate={{ [getCssPosition(position)]: "108%", opacity: 1 }}
            exit={{ [getCssPosition(position)]: "80%", opacity: 0 }}
            transition={{ duration: 0.23, ease: "easeInOut" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

interface Props extends DefaultProps {
  content: ReactNode;
  mode?: "click" | "hover";
  position?: FloatingPosition;
}
