import { PropsWithChildren } from "react";
import { DisplayTheme } from "../../types";
import { ThemeContext } from "./Theme";

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}
