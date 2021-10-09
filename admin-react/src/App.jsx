import "./style/App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoute";

// Import routes
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import UploadPage from "./routes/Upload";
import Pictures from "./routes/Pictures";
import Collections from "./routes/Collections";
import About from "./routes/About";
import NoMatch from "./routes/NoMatch";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/upload" component={UploadPage} />
          <PrivateRoute exact path="/pictures" component={Pictures} />
          <PrivateRoute exact path="/collections" component={Collections} />
          <PrivateRoute exact path="/about" component={About} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
