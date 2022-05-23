import { createContext, useContext, Context } from "react";
import { DisplayTheme } from "../../types";
import { createGlobalStyle } from "styled-components";
import { toKebab } from "../../utils";

export const ThemeContext: Context<DisplayTheme> =
  createContext<DisplayTheme>("Light");

/**
 * Get the current theme of Verto UI
 *
 * @returns DisplayTheme
 */
export const useTheme = (): DisplayTheme =>
  useContext<DisplayTheme>(ThemeContext);

/**
 * Theme color in RGB
 */
export const themeColor = "140, 25, 255";

const defaultTheme: SchemeTypes = {
  Light: {
    backgroundColor: "#fff",
    foregroundColor: "#000",
    foregroundReverseColor: "#fff",
    lightText: "#666",
    border: "#e6e6e6",
    secondaryText: "#666",
    lighterBackground: "#fafafa",
    hoverBackground: "f5f5f5",
    cec: "#CECECE",
    skeleton: "#E4E4E4",
    skeletonShine: "#bdbdbd",
    modalLayerDark: "rgba(0, 0, 0, .8)",
    componentBackground: "var(--background-color)",
    inputBorderColor: "var(--foreground-color)",
    success: "#00D46E",
    warning: "#FFD335",
    error: "#FF0000",
    standardShadow: "0px 10px 20px rgba(0, 0, 0, .2)",
    standardShadowHover: "0px 10px 20px rgba(0, 0, 0, .26)",
    darkerShadow: "0px 10px 25px rgba(0, 0, 0, .185)",
    lighterShadow: "0px 10px 20px rgba(0, 0, 0, .26)"
  },
  Dark: {
    backgroundColor: "#000",
    lighterBackgroundColor: "#060e2b",
    foregroundColor: "#fff",
    foregroundReverseColor: "#030a23",
    lightText: "#999999",
    border: "#333",
    secondaryText: "#888",
    lighterBackground: "#111",
    hoverBackground: "#1b1b1b",
    cec: "#9a9a9a",
    skeleton: "#242424",
    skeletonShine: "#323131",
    modalLayerDark: "rgba(0, 0, 0, .8)",
    componentBackground: "#151515",
    inputBorderColor: "#444444",
    success: "#00D46E",
    warning: "#FFD335",
    error: "#FF0000",
    standardShadow: "0px 0 1px 2px rgba(156, 160, 177, .2)",
    standardShadowHover: "0px 0 1px 2px rgba(156, 160, 177, .26)",
    darkerShadow: "0px 0 1px 2px rgba(156, 160, 177, .5)",
    lighterShadow: "0px 0 1px 2px rgba(156, 160, 177, .18)"
  }
};

const defaultVariables = {
  hoverShadow: "0 0 0 .25rem",
  primaryColor: themeColor
};

export const GlobalStyle = createGlobalStyle`
  body {
    ${(props) =>
      Object.keys(defaultTheme[props.theme as string])
        .map(
          (key: string) =>
            "--" +
            toKebab(key) +
            ": " +
            defaultTheme[props.theme as string][key] +
            ";"
        )
        .join("\n")}
    ${Object.keys(defaultVariables)
      .map((key: string) => `--${toKebab(key)}: ${defaultVariables[key]};`)
      .join("\n")}
  }
`;

export interface Theme {
  backgroundColor: string;
  foregroundColor: string;
  foregroundReverseColor: string;
  lighterBackgroundColor?: string;
  lightText: string;
  hoverBackground: string;
  cec: string; // CEC
  skeleton: string;
  skeletonShine: string;
  modalLayerDark: string; // modals' overlay
  componentBackground: string;
  inputBorderColor: string;
  success: string;
  warning: string;
  error: string;
  border: string;
  secondaryText: string;
  lighterBackground: string;

  standardShadow: string;
  standardShadowHover: string;
  darkerShadow: string;
  lighterShadow: string;
}

export interface SchemeTypes {
  Light: Theme;
  Dark: Theme;
}
