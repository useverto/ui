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
import styles from "./Select.module.sass";

const SelectContext: Context<ISelectContext> = createContext<ISelectContext>(
  null
);
const useSelectConfig = (): ISelectContext =>
  useContext<ISelectContext>(SelectContext);

export default function Select({
  children,
  className,
  code,
  value,
  ...props
}: PropsWithChildren<SelectProps>) {
  const theme = useTheme(),
    [contextValue, setContext] = useState<SelectConfig>({ opened: false });

  // set value programmatically
  useEffect(() => setContext((val) => ({ ...val, selected: value, code })), [
    value
  ]);

  return (
    <SelectContext.Provider value={{ value: contextValue, setContext }}>
      <div
        className={
          [styles.Select, theme === "Dark" ? styles.Dark : ""]
            .filter((val) => val !== "")
            .join(" ") +
          " " +
          (className ?? "")
        }
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

Select.Head = function ({
  children,
  className,
  code,
  ...props
}: PropsWithChildren<SelectHeadProps>) {
  const theme = useTheme(),
    { value, setContext } = useSelectConfig();

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

Select.Body = function ({
  children,
  className,
  ...props
}: PropsWithChildren<SelectBodyProps>) {
  const theme = useTheme(),
    { value, setContext } = useSelectConfig(),
    zIndex = 1000;

  return (
    <>
      {value.opened && (
        <div
          className={styles.SelectOverlay}
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

Select.Item = function ({
  children,
  className,
  code,
  value,
  ...props
}: PropsWithChildren<SelectItemProps>) {
  const theme = useTheme(),
    selectData = useSelectConfig();

  function setSelected() {
    selectData.setContext({
      ...selectData.value,
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
          code || selectData.value.code ? styles.Code : ""
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

Select.Divider = function ({
  className,
  ...props
}: PropsWithChildren<SelectDividerProps>) {
  return (
    <div className={styles.Divider + " " + (className ?? "")} {...props}></div>
  );
};

interface SelectProps {
  className?: string;
  code?: boolean;
  value?: string | number;
}

interface SelectHeadProps {
  className?: string;
  code?: boolean;
}

interface SelectBodyProps {
  className?: string;
}

interface SelectItemProps {
  className?: string;
  code?: boolean;
  value?: string | number;
}

interface SelectDividerProps {
  className?: string;
}

interface SelectConfig {
  opened?: boolean;
  selected?: string | number;
  display?: any;
  code?: boolean;
}

interface ISelectContext {
  value: SelectConfig;
  setContext: Function;
}
