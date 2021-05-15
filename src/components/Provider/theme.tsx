import { createContext, useContext, Context } from "react";
import { DisplayTheme } from "../../types";
import { createGlobalStyle } from "styled-components";

export const ThemeContext: Context<DisplayTheme> = createContext<DisplayTheme>(
  "Light"
);

/**
 * Get the current theme of Verto UI
 *
 * @returns DisplayTheme
 */
export const useTheme = (): DisplayTheme =>
  useContext<DisplayTheme>(ThemeContext);

const defaultTheme: SchemeTypes = {
  Light: {
    backgroundColor: "#fff",
    foregroundColor: "#000",
    foregroundReverseColor: "#fff",
    lightTextColor: "#666",
    darkerTextColor: "#CECECE",
    skeletonColor: "#E4E4E4",
    skeletonShineColor: "#bdbdbd",
    modalOverlayColor: "rgba(0, 0, 0, .8)",
    success: "#00D46E",
    warning: "#FFD335",
    error: "#FF0000",
    standardShadow: "0px 10px 20px rgba(0, 0, 0, .2)",
    standardShadowHover: "0px 10px 20px rgba(0, 0, 0, .26)",
    darkerShadow: "0px 10px 25px rgba(0, 0, 0, .185)",
    lighterShadow: "0px 10px 20px rgba(0, 0, 0, .26)"
  },
  Dark: {
    backgroundColor: "#030a23",
    foregroundColor: "#fff",
    foregroundReverseColor: "#030a23",
    lightTextColor: "#9CA0B1",
    darkerTextColor: "#CECECE",
    skeletonColor: "#131829",
    skeletonShineColor: "#181f35",
    modalOverlayColor: "rgba(0, 0, 0, .8)",
    success: "#00D46E",
    warning: "#FFD335",
    error: "#FF0000",
    standardShadow: "0px 0 1px 2px rgba(156, 160, 177, .2)",
    standardShadowHover: "0px 0 1px 2px rgba(156, 160, 177, .26)",
    darkerShadow: "0px 0 1px 2px rgba(156, 160, 177, .5)",
    lighterShadow: "0px 0 1px 2px rgba(156, 160, 177, .18)"
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    --background-color: ${(props) =>
      defaultTheme[props.theme as string].backgroundColor};
    --foreground-color: ${(props) =>
      defaultTheme[props.theme as string].foregroundColor};
    --foreground-reverse-color: ${(props) =>
      defaultTheme[props.theme as string].foregroundReverseColor};
    --light-text: ${(props) =>
      defaultTheme[props.theme as string].lightTextColor};
    --cec: ${(props) => defaultTheme[props.theme as string].darkerTextColor};
    --skeleton: ${(props) => defaultTheme[props.theme as string].skeletonColor};
    --skeleton-shine: ${(props) =>
      defaultTheme[props.theme as string].skeletonShineColor};
    --modal-layer-dark: ${(props) =>
      defaultTheme[props.theme as string].modalOverlayColor};
    --success: ${(props) => defaultTheme[props.theme as string].success};
    --warning: ${(props) => defaultTheme[props.theme as string].warning};
    --error: ${(props) => defaultTheme[props.theme as string].error};
      
    --standard-shadow: ${(props) =>
      defaultTheme[props.theme as string].standardShadow};
    --darker-shadow: ${(props) =>
      defaultTheme[props.theme as string].darkerShadow};
    --lighter-shadow: ${(props) =>
      defaultTheme[props.theme as string].lighterShadow};
    --standard-shadow-hover: ${(props) =>
      defaultTheme[props.theme as string].standardShadowHover};
  }
`;

export interface Theme {
  backgroundColor: string;
  foregroundColor: string;
  foregroundReverseColor: string;
  lightTextColor: string;
  darkerTextColor: string; // CEC
  skeletonColor: string;
  skeletonShineColor: string;
  modalOverlayColor: string; // modals' overlay
  success: string;
  warning: string;
  error: string;

  standardShadow: string;
  standardShadowHover: string;
  darkerShadow: string;
  lighterShadow: string;
}

export interface SchemeTypes {
  Light: Theme;
  Dark: Theme;
}
