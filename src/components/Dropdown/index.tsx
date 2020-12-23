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
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Dropdown.module.sass";

const DropdownContext: Context<IDropdownContext> = createContext<IDropdownContext>(
  null
);
const useDropdownConfig = (): IDropdownContext =>
  useContext<IDropdownContext>(DropdownContext);

export default function Dropdown({
  children,
  className,
  code,
  value,
  ...props
}: PropsWithChildren<DropdownProps>) {
  const theme = useTheme(),
    [contextValue, setContext] = useState<DropdownConfig>({ opened: false });

  // set value programmatically
  useEffect(() => setContext((val) => ({ ...val, selected: value, code })), [
    value
  ]);

  return (
    <DropdownContext.Provider value={{ value: contextValue, setContext }}>
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
}: PropsWithChildren<DropdownHeadProps>) {
  const theme = useTheme(),
    { value, setContext } = useDropdownConfig();

  return (
    <div
      className={
        [
          styles.Head,
          theme === "Dark" ? styles.Dark : "",
          code || value.code ? styles.Code : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
      onClick={() =>
        setContext({
          ...value,
          opened: !value.opened
        })
      }
    >
      {(value.selected && value.display && value.display) || children}
      <ChevronDown
        className={styles.Icon + " " + (value.opened ? styles.IconOpened : "")}
      />
    </div>
  );
};

Dropdown.Body = function ({
  children,
  className,
  ...props
}: PropsWithChildren<DropdownBodyProps>) {
  const theme = useTheme(),
    { value, setContext } = useDropdownConfig(),
    zIndex = 1000;

  return (
    <>
      {value.opened && (
        <div
          className={styles.DropdownOverlay}
          style={{ zIndex }}
          onClick={() => setContext({ ...value, opened: false })}
        ></div>
      )}
      <AnimatePresence>
        {value.opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              style={{ zIndex }}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Dropdown.Item = function ({
  children,
  className,
  code,
  value,
  ...props
}: PropsWithChildren<DropdownItemProps>) {
  const theme = useTheme(),
    dropdownData = useDropdownConfig();

  function setSelected() {
    dropdownData.setContext({
      ...dropdownData.value,
      selected: value,
      opened: false,
      display: children
    });
  }

  return (
    <div
      className={
        [
          styles.Item,
          theme === "Dark" ? styles.Dark : "",
          code || dropdownData.value.code ? styles.Code : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
      onClick={setSelected}
    >
      {children}
    </div>
  );
};

Dropdown.Divider = function ({
  className,
  ...props
}: PropsWithChildren<DropdownDividerProps>) {
  return (
    <div className={styles.Divider + " " + (className ?? "")} {...props}></div>
  );
};

interface DropdownProps {
  className?: string;
  code?: boolean;
  value?: string | number;
}

interface DropdownHeadProps {
  className?: string;
  code?: boolean;
}

interface DropdownBodyProps {
  className?: string;
}

interface DropdownItemProps {
  className?: string;
  code?: boolean;
  value?: string | number;
}

interface DropdownDividerProps {
  className?: string;
}

interface DropdownConfig {
  opened?: boolean;
  selected?: string | number;
  display?: any;
  code?: boolean;
}

interface IDropdownContext {
  value: DropdownConfig;
  setContext: Function;
}
