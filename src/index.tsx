import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import "./i18n.config";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <ReactTooltip id="main" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
