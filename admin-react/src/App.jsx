import "./style/App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { AuthProvider } from "./components/auth/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoute";

// Import routes
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import UploadPage from "./routes/Upload";
import Pictures from "./routes/Pictures";
import CollectionsPage from "./routes/Collections";
import About from "./routes/About";
import NoMatch from "./routes/NoMatch";
import CollectionDetail from "./routes/CollectionDetail";
import PictureDetail from "./routes/PictureDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/upload" component={UploadPage} />
          <PrivateRoute exact path="/pictures" component={Pictures} />
          <PrivateRoute exact path="/pictures/:id" component={PictureDetail} />
          <PrivateRoute exact path="/collections" component={CollectionsPage} />
          <PrivateRoute path="/collections/:id" component={CollectionDetail} />
          <PrivateRoute exact path="/about" component={About} />

          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// class App extends React.Component {
//   componentDidMount() {}

//   render() {
//     return (
//       <AuthProvider>
//         <Router>
//           <Switch>
//             <Route path="/login" component={Login} />
//             <PrivateRoute exact path="/" component={Dashboard} />
//             <PrivateRoute exact path="/upload" component={UploadPage} />
//             <PrivateRoute exact path="/pictures" component={Pictures} />
//             <PrivateRoute exact path="/pictures/:id" component={PictureDetail} />
//             <PrivateRoute
//               exact
//               path="/collections"
//               component={CollectionsPage}
//             />
//             <PrivateRoute
//               path="/collections/:id"
//               component={CollectionDetail}
//             />
//             <PrivateRoute exact path="/about" component={About} />

//             <Route path="*" component={NoMatch} />
//           </Switch>
//         </Router>
//       </AuthProvider>
//     );
//   }
// }

export default App;
