import { Button } from "@verto/ui";
import "./styles.css";

function App() {
  return (
    <div className="content">
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
        style={{ background: "#000", padding: "1.3em", width: "min-content" }}
      >
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
    </div>
  );
}

export default App;
