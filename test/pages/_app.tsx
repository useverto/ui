import { Button, Spacer, VertoProvider } from "@verto/ui";
import { useState } from "react";
import "../styles/styles.sass";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState<"Light" | "Dark">("Dark");

  return (
    <VertoProvider theme={theme}>
      <Spacer y={1} />
      <Button onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}>
        Switch theme
      </Button>
      <Spacer y={1} />
      <Component {...pageProps} />
    </VertoProvider>
  );
}
