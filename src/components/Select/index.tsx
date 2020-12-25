import React, {
  PropsWithChildren,
  createContext,
  useContext,
  Context,
  useState,
  useEffect,
  ReactNode
} from "react";
import { useTheme } from "../Provider/Theme";
import { ChevronDown } from "@geist-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Input";
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
  search = false,
  disabled = false,
  onChange,
  ...props
}: PropsWithChildren<SelectProps>) {
  const theme = useTheme(),
    [contextValue, setContext] = useState<SelectConfig>({
      opened: false,
      code,
      search,
      disabled
    });

  // set values programmatically
  useEffect(
    () =>
      setContext((val) => ({
        ...val,
        selected: value,
        code,
        search,
        disabled
      })),
    [value, code, search, disabled]
  );

  // on change
  useEffect(() => {
    if (contextValue.selected && contextValue.selected !== "" && onChange)
      onChange(contextValue.selected);
  }, [contextValue.selected]);

  return (
    <SelectContext.Provider value={{ value: contextValue, setContext }}>
      <div
        className={
          [
            styles.Select,
            theme === "Dark" ? styles.Dark : "",
            contextValue.opened ? styles.Opened : ""
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
    </SelectContext.Provider>
  );
}

Select.Head = function ({
  children,
  className,
  code,
  icon = true,
  labelIcon,
  uppercase = false,
  ...props
}: PropsWithChildren<SelectHeadProps>) {
  const theme = useTheme(),
    { value, setContext } = useSelectConfig();

  function toggleOpened() {
    if (value.disabled) return;
    setContext({
      ...value,
      opened: !value.opened
    });
  }

  return (
    <div
      className={
        [
          styles.Head,
          theme === "Dark" ? styles.Dark : "",
          code || value.code ? styles.Code : "",
          icon ? "" : styles.NoIcon,
          value.disabled ? styles.Disabled : "",
          uppercase ? styles.Uppercase : ""
        ]
          .filter((val) => val !== "")
          .join(" ") +
        " " +
        (className ?? "")
      }
      {...props}
      onClick={toggleOpened}
    >
      {labelIcon && <div className={styles.LabelIcon}>{labelIcon}</div>}
      {(value.selected && value.display && value.display) || children}
      {icon && (
        <ChevronDown
          className={
            styles.Icon + " " + (value.opened ? styles.IconOpened : "")
          }
        />
      )}
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
              {value.search && (
                <div className={styles.Search}>
                  <Input
                    label="Search"
                    reverse
                    value={value.searchFilter ?? ""}
                    onChange={(e) =>
                      setContext((val) => ({
                        ...val,
                        searchFilter: e.target.value
                      }))
                    }
                  />
                </div>
              )}
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
  disabled,
  uppercase = false,
  ...props
}: PropsWithChildren<SelectItemProps>) {
  const theme = useTheme(),
    selectData = useSelectConfig();

  function setSelected() {
    if (disabled) return;

    selectData.setContext({
      ...selectData.value,
      selected: value,
      opened: false,
      display: children
    });
  }

  function isShown() {
    // if search is disabled or the filter is empty
    if (
      !selectData.value.search ||
      !selectData.value.searchFilter ||
      selectData.value.searchFilter === ""
    )
      return true;

    // if the value/children matches the search query
    if (
      children
        .toString()
        .toLowerCase()
        .includes(selectData.value.searchFilter.toLowerCase()) ||
      value
        .toString()
        .toLowerCase()
        .includes(selectData.value.searchFilter.toLowerCase())
    )
      return true;

    return false;
  }

  return (
    <>
      {isShown() && (
        <div
          className={
            [
              styles.Item,
              theme === "Dark" ? styles.Dark : "",
              code || selectData.value.code ? styles.Code : "",
              disabled ? styles.Disabled : "",
              uppercase ? styles.Uppercase : ""
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
      )}
    </>
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
  search?: boolean;
  value?: string | number;
  disabled?: boolean;
  onChange?: (val: string | number) => void;
}

interface SelectHeadProps {
  className?: string;
  code?: boolean;
  icon?: boolean;
  labelIcon?: ReactNode;
  uppercase?: boolean;
}

interface SelectBodyProps {
  className?: string;
}

interface SelectItemProps {
  className?: string;
  code?: boolean;
  value?: string | number;
  disabled?: boolean;
  uppercase?: boolean;
}

interface SelectDividerProps {
  className?: string;
}

interface SelectConfig {
  opened?: boolean;
  selected?: string | number;
  display?: any;
  code?: boolean;
  search?: boolean;
  searchFilter?: string;
  disabled?: boolean;
}

interface ISelectContext {
  value: SelectConfig;
  setContext: React.Dispatch<React.SetStateAction<SelectConfig>>;
}
