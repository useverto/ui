import { Button } from "@verto/ui";

function App() {
  return (
    <div>
      <Button type="primary">Read more</Button>

      <div
        style={{ background: "#000", padding: "1.3em", width: "min-content" }}
      >
        <Button type="primary" reverse>
          Read more
        </Button>
      </div>
    </div>
  );
}

export default App;
