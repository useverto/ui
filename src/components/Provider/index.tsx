import { PropsWithChildren, useEffect } from "react";
import { DisplayTheme } from "../../types";
import { ThemeContext } from "./Theme";

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  useEffect(() => {
    if (theme === "Dark")
      document.querySelector("html").classList.add("dark-theme");
    else document.querySelector("html").classList.remove("dark-theme");

    document.body.style.backgroundColor = theme === "Light" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}
