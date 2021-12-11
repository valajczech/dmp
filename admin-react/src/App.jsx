import "./style/App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoute";

// Helpers
import emmiter from "./utils/EventEmitter";
import { Storage } from "./helpers/storage";

import { Collections } from "./helpers/collections";
import { Analytics } from "./helpers/analytics";

// Import routes
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import UploadPage from "./routes/Upload";
import Pictures from "./routes/Pictures";
import CollectionsPage from "./routes/Collections";
import About from "./routes/About";
import NoMatch from "./routes/NoMatch";
import CollectionDetail from "./routes/CollectionDetail";
import LoginLoadingScreen from "./components/auth/LoginLoadingScreen";
require("dotenv").config();
class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/upload" component={UploadPage} />
            <PrivateRoute exact path="/pictures" component={Pictures} />
            <PrivateRoute
              exact
              path="/collections"
              component={CollectionsPage}
            />
            <PrivateRoute
              path="/collections/:id"
              component={CollectionDetail}
            />
            <PrivateRoute exact path="/about" component={About} />

            <Route path="*" component={NoMatch} />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
