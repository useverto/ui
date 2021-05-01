import {
  PropsWithChildren,
  useEffect,
  createContext,
  useState,
  useContext
} from "react";
import { DisplayTheme, ToastData } from "../../types";
import { ThemeContext, GlobalStyle } from "./theme";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "./Provider.module.sass";

type ToastDataWithID = ToastData & { displayed: boolean };
const ToastsContext = createContext<{
  toasts: ToastDataWithID[];
  setToast: (toast: ToastData) => void;
}>({
  toasts: [],
  setToast() {}
});
export const useToasts = () => useContext(ToastsContext);

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  const [toasts, setToasts] = useState<ToastDataWithID[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "Light" ? "#fff" : "#000";
  }, [theme]);

  const setToast = (toast: ToastData) =>
    setToasts((val) => {
      const newID = toasts.length;
      setTimeout(
        () =>
          setToasts((currentToasts) =>
            currentToasts.map((val, i) => ({
              ...val,
              displayed: i === newID ? false : val.displayed
            }))
          ),
        toast.duration
      );
      return [...val, { ...toast, displayed: true }];
    });

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyle theme={theme} />
      <ToastsContext.Provider value={{ toasts, setToast }}>
        {children}
        <div className={"VertoToasts " + styles.Toasts} id="verto_toasts">
          <ToastsContext.Consumer>
            {(value) => (
              <AnimatePresence>
                {value.toasts?.map(
                  (toast, i) =>
                    toast.displayed && (
                      <Toast
                        title={toast.title}
                        description={toast.description}
                        type={toast.type}
                        key={i}
                        onClick={() =>
                          setToasts((currentToasts) =>
                            currentToasts.map((val, j) => ({
                              ...val,
                              displayed: i === j ? false : val.displayed
                            }))
                          )
                        }
                      />
                    )
                )}
              </AnimatePresence>
            )}
          </ToastsContext.Consumer>
        </div>
      </ToastsContext.Provider>
    </ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}
