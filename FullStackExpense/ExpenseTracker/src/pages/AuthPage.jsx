import ForgotPassword from "../components/Authentication/ForgotPassword";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { Route, Redirect } from "react-router-dom";
const AuthPage = () => {
  return (
    <>
      <Route path="/auth" exact>
        <Redirect to="/auth/login" />
      </Route>
      <Route path="/auth/login" exact>
        <Login />
      </Route>
      <Route path="/auth/sign-up" exact>
        <Signup />
      </Route>
      <Route path="/auth/forgot-password" exact>
        <ForgotPassword />
      </Route>
    </>
  );
};
export default AuthPage;
