import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import LinkGenerator from "./components/link-generator.component";
import Stats from "./components/stats.component";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          LinkShortner
          </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/generate"} className="nav-link">
              Home
              </Link>
          </li>
          <li className="nav-item">
            <Link to={"/stats"} className="nav-link">
              Stats
              </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/generate"]} component={LinkGenerator} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
