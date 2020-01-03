import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Dashboard = React.lazy(() => import("./dashboard"));
const Login = React.lazy(() => import("./login"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <React.Suspense fallback={<div />}>
            <Dashboard />
          </React.Suspense>
        </Route>
        <Route path="/">
          <React.Suspense fallback={<div />}>
            <Login />
          </React.Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
