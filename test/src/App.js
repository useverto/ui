import {
  VertoProvider,
  Button,
  Page,
  Card,
  Loading,
  Dropdown
} from "@verto/ui";
import { useState } from "react";
import { User, Plus } from "@geist-ui/react-icons";
import "./styles.css";

function App() {
  const [theme, setTheme] = useState("Light");

  return (
    <VertoProvider theme={theme}>
      <Page>
        <div className="section">
          <h1>Theme</h1>
          <Button
            type="primary"
            onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
          >
            Set to {theme === "Light" ? "Dark" : "Light"}
          </Button>
        </div>
        <div className="section">
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
          <h2>Code</h2>
          <Button type="primary" code>
            Code
          </Button>
          <h2>Icon</h2>
          <Button type="primary" icon={<User />} style={{ marginRight: "1em" }}>
            Primary
          </Button>
          <Button.Icon>
            <Plus />
          </Button.Icon>
        </div>
        <div className="section">
          <h1>Text</h1>
          <h1>h1 element</h1>
          <h2>h2 element</h2>
          <h3>h3 element</h3>
          <h4>h4 element</h4>
          <h5>h5 element</h5>
          <h6>h6 element</h6>
          <h6 className="code">Code heading</h6>
          <p>Paragraph element</p>
          <p className="code">Code paragraph element</p>
        </div>
        <div className="section">
          <h1>Links</h1>
          <a href="https://verto.exchange">Link</a>{" "}
          <a href="https://verto.exchange" className="underline">
            Underline
          </a>{" "}
          <a href="https://verto.exchange" className="code">
            Code
          </a>
        </div>
        <div className="section">
          <h1>Cards</h1>
          <Card style={{ marginBottom: "1em" }} className="test-token">
            <h1 className="code">VRT</h1>
            <div className="info">
              <h4 className="code">
                <span>[PST]</span>Verto
              </h4>
              <p className="code">
                <span>ID:</span>usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A
              </p>
            </div>
          </Card>
          <Card style={{ marginBottom: "1em" }}>
            <p>This is a test hoverable Verto card</p>
          </Card>
          <Card design="Geist" style={{ marginBottom: "1em" }}>
            <p>This is a test Geist card</p>
          </Card>
          <Card hoverable design="Geist" style={{ marginBottom: "1em" }}>
            <p>This is a hoverable card</p>
          </Card>
          <Card hoverable design="Geist" shadow>
            <p>This is a shadowed card</p>
          </Card>
        </div>
        <div className="section">
          <h1>Loading</h1>
          <div
            style={{ position: "relative", width: "2em", marginBottom: "3em" }}
          >
            <Loading.Dots></Loading.Dots>
          </div>
          <div style={{ width: "2em", marginBottom: "1em" }}>
            <Loading.Spinner></Loading.Spinner>
          </div>
          <div style={{ width: "9em" }}>
            <Loading.Skeleton></Loading.Skeleton>
          </div>
        </div>
        <div className="section">
          <h1>Dropdowns</h1>
          <Dropdown className="select">
            <Dropdown.Head>Select one</Dropdown.Head>
            <Dropdown.Body>
              <Dropdown.Item value="one">One</Dropdown.Item>
              <Dropdown.Item value="two" selected>
                Two
              </Dropdown.Item>
              <Dropdown.Item value="three">Three</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
          <Dropdown className="select" code>
            <Dropdown.Head>Code</Dropdown.Head>
            <Dropdown.Body>
              <Dropdown.Item value="one">One</Dropdown.Item>
              <Dropdown.Item value="two" selected>
                Two
              </Dropdown.Item>
              <Dropdown.Item value="three">Three</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
          <Dropdown className="select">
            <Dropdown.Head>With divider</Dropdown.Head>
            <Dropdown.Body>
              <Dropdown.Item value="one">One</Dropdown.Item>
              <Dropdown.Item value="two" selected>
                Two
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item value="three">Three</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        </div>
      </Page>
    </VertoProvider>
  );
}

export default App;
