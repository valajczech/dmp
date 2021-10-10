import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "../../style/routes/PrivateRoute.css";
// Import components
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <div className="appContainer">
            <Sidebar />
            <div className="content">
              <Topbar />
              <div className="wrapper">
                <RouteComponent {...routeProps} />
              </div>
            </div>
          </div>
        ) : (
          
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
