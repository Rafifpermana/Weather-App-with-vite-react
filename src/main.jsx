import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LinkBar from "./common/LinkBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{
        backgroundColor: "#ecf0f1",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <LinkBar />
      <App />
    </div>
  </React.StrictMode>
);
