import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import "../style/routes/Login.css";
import { AuthContext } from "../components/auth/AuthProvider";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email.value, password.value).catch(
        (err) => {
          console.error(err);
        }
      );
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div id="login-page">
      <form onSubmit={handleLogin}>
        <div className="inputs">
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
