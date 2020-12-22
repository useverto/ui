import {
  PropsWithChildren,
  createContext,
  useContext,
  Context,
  useState,
  useEffect
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
  const theme = useTheme(),
    [context, setContext] = useState<DropdownConfig>({ opened: false });

  return (
    <DropdownContext.Provider value={{ ...context, setContext }}>
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
      onClick={() =>
        dropdownData.setContext({
          ...dropdownData,
          opened: !dropdownData.opened
        })
      }
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
      transition={{ duration: 0.2 }}
    >
      <div
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
      </div>
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

  useEffect(() => {
    selected = dropdownData.selected === value;
  }, [dropdownData.selected]);

  useEffect(() => {
    if (selected) dropdownData.setContext({ ...dropdownData, selected: value });
  }, [selected, value]);

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
      onClick={() =>
        dropdownData.setContext({ ...dropdownData, selected: value })
      }
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
  setContext?: Function;
}
