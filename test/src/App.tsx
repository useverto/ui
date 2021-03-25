import { VertoProvider } from "@verto/ui";
import { useState } from "react";
import "./styles.sass";

export default function App() {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  return <VertoProvider theme={theme}>test</VertoProvider>;
}
