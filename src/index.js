import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
// import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PublicLayout from "layouts/Public.js";
// import App from "App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const user = localStorage.getItem('token');
root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/public" render={(props) => <PublicLayout {...props} />} />
    </Switch>
    <Redirect from="/" to="/admin/index" /> 
  </BrowserRouter>
);
