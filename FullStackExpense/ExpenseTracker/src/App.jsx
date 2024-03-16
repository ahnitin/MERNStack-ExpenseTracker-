import { Route, Redirect, Switch } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import Footer from "./components/Layout/Footer";
import AuthPage from "./pages/AuthPage";
import Expense from "./pages/Expense";
import ErrorPage from "./pages/ErrorPage";
import Files from "./pages/Files";
import Reports from "./pages/Reports";
import Premium from "./pages/Premium";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
const App = () => {
  const { isLoggedIn, isPremium } = useContext(AuthContext);

  return (
    <>
      <DefaultLayout></DefaultLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/expenses"></Redirect>
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/premium">
          {isLoggedIn && <Premium />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/files">
          {isPremium && <Files />}
          {!isPremium && <Redirect to="/auth" />}
        </Route>
        <Route path="/reports">
          {isPremium && <Reports />}
          {!isPremium && <Redirect to="/auth" />}
        </Route>
        <Route path="/leader-board">
          <LeaderBoardPage />
        </Route>
        <Route path="/expenses">
          {isLoggedIn && <Expense />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
};
export default App;
