import { PropsWithChildren, useEffect, useState } from "react";
import { DisplayTheme } from "../../types";
import { ThemeContext } from "./Theme";
import { createGlobalStyle } from "styled-components";

export default function Provider({
  theme = "Light",
  children
}: PropsWithChildren<ProviderProps>) {
  const [GlobalVariables, setGlobalVariables] = useState(createGlobalStyle`
    --background-color: #fff;
    --foreground-color: #000;
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
  `);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "Light" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalVariables />
      {children}
    </ThemeContext.Provider>
  );
}

interface ProviderProps {
  theme?: DisplayTheme;
}
