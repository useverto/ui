import { VertoProvider } from "@verto/ui";
import { useState } from "react";
import "../styles/styles.sass";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  return (
    <VertoProvider theme={theme}>
      <Component {...pageProps} />
    </VertoProvider>
  );
}
