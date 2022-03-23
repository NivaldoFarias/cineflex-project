import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector(".root")
);
