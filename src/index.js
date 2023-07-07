import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, /*Redirect*/ } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/text-shadow.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
// import PublicLayout from "layouts/Public.js";
// import  RmiLayout from 'layouts/Rmi'
import NotFoundLayout from "layouts/404";
import { ProtectedRoute } from "components/protected/protectedRoutes";
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.interceptors.request.use(function(config) {
  // Configuración para desactivar logs de Axios en la consola
  config.headers['X-Console-Ignore'] = true;
  return config;
});

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <ProtectedRoute><AdminLayout {...props} /></ProtectedRoute> } />
      {/* <Route path="/rmi" render={(props) => <RmiLayout {...props} />} />
      <Route path="/public" render={(props) => <PublicLayout {...props} />} /> */}
      <Route path="*" render={(props) => <NotFoundLayout {...props} />} />
    </Switch>
    {/* <Redirect from="/" to="/admin/index" /> */}
  </BrowserRouter>
);
