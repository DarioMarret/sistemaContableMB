import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from './App';
const hist = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
     <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
