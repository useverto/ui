import {
  VertoProvider,
  Button,
  Page,
  Card,
  Loading,
  Select,
  Note,
  Input,
  Table
} from "@verto/ui";
import { useState } from "react";
import {
  User,
  Plus,
  AtSign,
  CheckInCircle,
  AlertCircle
} from "@geist-ui/react-icons";
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
          <Button type="primary" style={{ marginBottom: "1em" }} code>
            Code
          </Button>
          <br />
          <Button type="primary" code uppercase>
            Uppercase
          </Button>
          <h2>Icon</h2>
          <Button type="primary" icon={<User />} style={{ marginRight: "1em" }}>
            Primary
          </Button>
          <Button.Icon>
            <Plus />
          </Button.Icon>
          <h2>Thin</h2>
          <Button type="primary" style={{ marginBottom: "1em" }} thin>
            Thin
          </Button>
          <br />
          <Button type="primary" thin uppercase>
            Thin uppercase
          </Button>
          <h2>Minifont</h2>
          <Button type="primary" style={{ marginBottom: "1em" }} minifont>
            Minifont
          </Button>
          <br />
          <Button
            type="primary"
            style={{ marginBottom: "1em" }}
            thin
            uppercase
            minifont
          >
            Thin with minifont
          </Button>
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
          <h1>Selects</h1>
          <Select className="select">
            <Select.Head>Select one</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
              <Select.Item value="dis" disabled>
                Disabled option
              </Select.Item>
            </Select.Body>
          </Select>
          <Select className="select" code>
            <Select.Head>Code</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
          <Select className="select">
            <Select.Head>With divider</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Divider />
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
          <Select className="select">
            <Select.Head icon={false}>No icon</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
          <Select className="select" search>
            <Select.Head>Search</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
          <Select className="select" disabled>
            <Select.Head>Disabled</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
          <Select className="select">
            <Select.Head labelIcon={<AtSign />}>With icon</Select.Head>
            <Select.Body>
              <Select.Item value="one">One</Select.Item>
              <Select.Item value="two">Two</Select.Item>
              <Select.Item value="three">Three</Select.Item>
            </Select.Body>
          </Select>
        </div>
        <div className="section">
          <h1>Notes</h1>
          <Note>Default note</Note>
          <Note type="primary">Primary note</Note>
          <Note type="success">Success note</Note>
          <Note type="warning">Warning note</Note>
          <Note type="error">Error note</Note>
          <Note type="warning" dismiss>
            Allow dismiss
          </Note>
          <h2>Label customization</h2>
          <Note type="success" label="Hey">
            Change the label
          </Note>
          <Note type="success" labelIcon={<CheckInCircle />}>
            Add an icon
          </Note>
          <h2>Filled</h2>
          <Note type="primary" filled>
            Primary note
          </Note>
          <Note type="success" filled>
            Success note
          </Note>
          <Note type="warning" filled>
            Warning note
          </Note>
          <Note type="error" filled>
            Error note
          </Note>
          <Note labelIcon={<AlertCircle />} filled>
            Filled with icon
          </Note>
        </div>
        <div className="section" style={{ width: "30%" }}>
          <h1>Inputs</h1>
          <Input label="Input" style={{ marginBottom: "2em" }} />
          <Input label="Disabled" style={{ marginBottom: "2em" }} disabled />
          <Input
            label="Readonly"
            value="Read only"
            style={{ marginBottom: "2em" }}
            readOnly
          />
          <Input label="Error" style={{ marginBottom: "2em" }} theme="error" />
          <Input
            label="Warning"
            style={{ marginBottom: "2em" }}
            theme="warning"
          />
          <Input
            label="Success"
            style={{ marginBottom: "2em" }}
            theme="success"
          />
          <Input label="Code" style={{ marginBottom: "2em" }} code />
          <Input
            label="With clear button"
            style={{ marginBottom: "2em" }}
            value="Test"
            clearButton
          />
          <Input value={10} label="Bold input" type="number" bold />
          <br />
          <Input value={10} label="Children" type="number" bold>
            <Select value="Eth" code>
              <Select.Head>Currency</Select.Head>
              <Select.Body>
                <Select.Item value="eth">Eth</Select.Item>
                <Select.Item value="ar">Ar</Select.Item>
              </Select.Body>
            </Select>
          </Input>
        </div>
        <div className="section">
          <h1>Tables</h1>
          <Table>
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>Tel.</th>
              <th>Age</th>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
            </tbody>
          </Table>
          <br />
          <Table code>
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>Tel.</th>
              <th>Age</th>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>john@doe.com</td>
                <td>06804329244</td>
                <td>22</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Page>
    </VertoProvider>
  );
}

export default App;
