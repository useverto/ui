import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { VertoProvider } from "@verto/ui";

ReactDOM.render(
  <React.StrictMode>
    <VertoProvider theme="Light">
      <App />
    </VertoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
