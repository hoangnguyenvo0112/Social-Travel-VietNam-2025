import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/login/Login";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={AdminLayout}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default observer(AppRoute);
