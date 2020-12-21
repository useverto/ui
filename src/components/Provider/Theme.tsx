import { createContext, useContext, Context } from "react";
import { DisplayTheme } from "../../types";

export const ThemeContext: Context<DisplayTheme> = createContext<DisplayTheme>(
  "Light"
);

/**
 * Get the current theme of Verto UI
 *
 * returns DisplayTheme
 */
export const useTheme = (): DisplayTheme =>
  useContext<DisplayTheme>(ThemeContext);
