import { VertoProvider, Button } from "@verto/ui";
import { useState } from "react";
import "./styles.sass";

export default function App() {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  return (
    <VertoProvider theme={theme}>
      <Button>Filled</Button>
      <Button type="outlined">Outlined</Button>
      <Button type="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button small>Small</Button>
      <Button type="outlined" small>
        Small outlined
      </Button>
    </VertoProvider>
  );
}
