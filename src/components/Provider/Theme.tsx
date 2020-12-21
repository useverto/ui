import { createContext, useContext, Context } from "react";
import { DisplayTheme } from "../../types";

export const ThemeContext: Context<DisplayTheme> = createContext<DisplayTheme>(
  "Light"
);
export const useTheme = (): DisplayTheme =>
  useContext<DisplayTheme>(ThemeContext);
