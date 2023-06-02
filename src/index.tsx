import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import 'bootstrap/dist/js/bootstrap.js'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);


reportWebVitals();
