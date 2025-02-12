import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{
        backgroundColor: "#ecf0f1",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <App />
    </div>
  </React.StrictMode>
);
