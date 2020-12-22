import {
  PropsWithChildren,
  createContext,
  useContext,
  Context,
  useState
} from "react";
import { useTheme } from "../Provider/Theme";
import { ChevronDown } from "@geist-ui/react-icons";
import { motion } from "framer-motion";
import styles from "./Dropdown.module.sass";

const DropdownContext: Context<DropdownConfig> = createContext<DropdownConfig>({
  opened: false
});
const useDropdownConfig = (): DropdownConfig =>
  useContext<DropdownConfig>(DropdownContext);

export default function Dropdown({
  children,
  className,
  code,
  ...props
}: PropsWithChildren<DropdownProps>) {
  const theme = useTheme();

  return (
    <DropdownContext.Provider value={{ opened: false }}>
      <div
        className={
          [styles.Dropdown, theme === "Dark" ? styles.Dark : ""]
            .filter((val) => val !== "")
            .join(" ") +
          " " +
          (className ?? "")
        }
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Head = function ({
  children,
  className,
  code,
  ...props
}: PropsWithChildren<DropdownProps>) {
  const theme = useTheme(),
    dropdownData = useDropdownConfig();

  return (
    <div
      className={
        [
          styles.Head,
          theme === "Dark" ? styles.Dark : "",
          code ? styles.Code : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
    >
      {(!dropdownData.selected && children) || dropdownData.selected}
      <ChevronDown className={styles.Icon} />
    </div>
  );
};

Dropdown.Body = function ({
  children,
  className,
  code,
  ...props
}: PropsWithChildren<DropdownProps>) {
  const theme = useTheme(),
    dropdownData = useDropdownConfig();

  return (
    <motion.div
      animate={{ opacity: dropdownData.opened ? 1 : 0 }}
      className={
        [styles.Body, theme === "Dark" ? styles.Dark : ""]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
    >
      {children}
    </motion.div>
  );
};

Dropdown.Item = function ({
  children,
  className,
  code,
  selected,
  value,
  ...props
}: PropsWithChildren<DropdownItemProps>) {
  const theme = useTheme(),
    dropdownData = useDropdownConfig();

  return (
    <div
      className={
        [
          styles.Item,
          theme === "Dark" ? styles.Dark : "",
          code ? styles.Code : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
    >
      {children}
    </div>
  );
};

interface DropdownProps {
  className?: string;
  code?: boolean;
}

interface DropdownItemProps {
  className?: string;
  code?: boolean;
  selected?: boolean;
  value?: string | number;
}

interface DropdownConfig {
  opened: boolean;
  selected?: string | number;
}
