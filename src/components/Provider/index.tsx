import { PropsWithChildren, useEffect } from "react";
import { DisplayTheme } from "../../types";
import { ThemeContext, CssVariables } from "./theme";

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  useEffect(() => {
    document.body.style.backgroundColor = theme === "Light" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <CssVariables theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}
