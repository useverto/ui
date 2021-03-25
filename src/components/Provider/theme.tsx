import { createContext, useContext, Context } from "react";
import { DisplayTheme } from "../../types";
import { createGlobalStyle } from "styled-components";

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

export const CssVariables = ({ theme }: { theme: DisplayTheme }) => {
  const GlobalStyle = createGlobalStyle`
    body {
      --background-color: #fff;
      --foreground-color: #000;
      --foreground-reverse-color: #fff;
      --light-text: #666;
      --cec: #CECECE;
      --skeleton: #E4E4E4;
      --modal-layer-dark: rgba(0, 0, 0, .8);
      --success: #00D46E;
      --warning: #FFD336;
      --error: #FF0000;
      
      --standard-shadow: 0px 10px 20px rgba(0, 0, 0, .2);
      --darker-shadow: 0px 10px 35px rgba(0, 0, 0, .35);
      --lighter-shadow: 0px 10px 25px rgba(0, 0, 0, .1);
      --standard-shadow-hover: 0px 10px 20px rgba(0, 0, 0, .33);
    }
  `;

  return <GlobalStyle />;
};
