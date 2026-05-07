import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { SkincareProvider } from "./context/SkincareContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <SkincareProvider>
        <App />
      </SkincareProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
