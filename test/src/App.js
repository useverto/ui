import { VertoProvider, Button } from "@verto/ui";
import { useState } from "react";
import { User } from "@geist-ui/react-icons";
import "./styles.css";

function App() {
  const [theme, setTheme] = useState("Light");

  return (
    <VertoProvider theme={theme}>
      <div className="content">
        <h1>Theme</h1>
        <Button
          type="primary"
          onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
        >
          Set to {theme === "Light" ? "Dark" : "Light"}
        </Button>
        <h1>Buttons</h1>
        <h2>Normal</h2>
        <div className="button-container">
          <Button type="default">Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
        </div>
        <h2>Reverse</h2>
        <div
          className="button-container"
          style={{
            background: theme === "Light" ? "#000" : "#fff",
            padding: "1.3em",
            justifyContent: "normal"
          }}
        >
          <Button style={{ marginRight: "1em" }} reverse>
            Read more
          </Button>
          <Button type="primary" reverse>
            Read more
          </Button>
        </div>
        <h2>Shadow</h2>
        <div className="button-container">
          <Button type="primary" shadow>
            Primary
          </Button>
          <Button type="success" shadow>
            Success
          </Button>
          <Button type="warning" shadow>
            Warning
          </Button>
          <Button type="danger" shadow>
            Danger
          </Button>
        </div>
        <h2>Icon</h2>
        <Button type="primary" icon={<User />}>
          Primary
        </Button>
      </div>
    </VertoProvider>
  );
}

export default App;
