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
  position = "top",
  closeOnClick = false
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false),
    popoverRef = useRef<HTMLDivElement>(),
    wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    document.addEventListener("mousedown", handleClicks);

    return () => {
      document.removeEventListener("mousedown", handleClicks);
    };
  });

  function handleClicks(e: MouseEvent) {
    if (mode !== "click") return;
    if (!open && wrapperRef.current?.contains(e.target as Node)) setOpen(true);
    else if (open && !popoverRef.current?.contains(e.target as Node))
      setOpen(false);
  }

  return (
    <div
      className={"VertoPopoverWrapper " + styles.PopoverWrapper}
      onMouseEnter={() => {
        if (mode === "hover") setOpen(true);
      }}
      onMouseLeave={() => {
        if (mode === "hover") setOpen(false);
      }}
      ref={wrapperRef}
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
            ref={popoverRef}
            onMouseUp={() => {
              if (closeOnClick) setOpen(false);
            }}
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
  closeOnClick?: boolean;
}
