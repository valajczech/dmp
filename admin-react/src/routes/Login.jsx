import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import React, { useCallback, useContext} from "react";
import "../style/routes/Login.css";
import { AuthContext } from "../components/auth/AuthProvider";

// Helpers
import { Storage } from "../helpers/storage";
import LoginLoadingScreen from "../components/auth/LoginLoadingScreen";


const Login = ({ history }) => {
  // Clear the localStorage just in case
  Storage.clear();
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
    []
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <LoginLoadingScreen />;
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
