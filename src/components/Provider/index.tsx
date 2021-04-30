import {
  PropsWithChildren,
  useEffect,
  createContext,
  useState,
  useContext
} from "react";
import { DisplayTheme, ToastData } from "../../types";
import { ThemeContext, GlobalStyle } from "./theme";
import Toast from "../Toast";
import styles from "./Provider.module.sass";

const ToastsContext = createContext<{
  toasts: ToastData[];
  setToast: (toast: ToastData) => void;
}>(null);

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "Light" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyle theme={theme} />
      {children}
      <ToastsContext.Provider
        value={{
          toasts,
          setToast: (toast) => setToasts((val) => ({ ...val, toast }))
        }}
      >
        <div className={styles.Toasts}>
          <ToastsContext.Consumer>
            {(value) =>
              value.toasts?.map((toast, i) => (
                <Toast
                  title={toast.title}
                  description={toast.description}
                  type={toast.type}
                  key={i}
                />
              ))
            }
          </ToastsContext.Consumer>
        </div>
      </ToastsContext.Provider>
    </ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}

export const useToasts = useContext(ToastsContext);
