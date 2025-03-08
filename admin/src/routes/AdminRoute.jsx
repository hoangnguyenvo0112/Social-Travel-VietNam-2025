import { Redirect, Route, Switch } from "react-router-dom";

import PaymentModal from "@/components/modal/PaymentModal";
import ConfigService from "@/pages/dashboard/ConfigService";
import OrderPage from "@/pages/dashboard/OrderPage";
import OrderDetailPage from "@/pages/order/OrderDetailPage";
import { ROLE_ID } from "@/utils/constant";
import { getUserInfoFromLocalStorage } from "@/utils/decodeToken";
import { useHistory } from "react-router-dom";
import Bar from "../pages/statistic/BusinessStatistic";
import Business from "../pages/business/Business";
import Calendar from "../pages/calendar/Calendar";
import CreateStaff from "../pages/createstaff/CreateStaff";
import Analytics from "../pages/dashboard/Analytics";
import Service from "../pages/dashboard/Service";
import SocialMedia from "../pages/dashboard/SocialMedia";
import FAQ from "../pages/faq/FAQ";
import Groups from "../pages/group/Groups";

import Line from "../pages/line/Line";
import Members from "../pages/members/Members";
import Pie from "../pages/pie/Pie";
import ProfilePage from "../pages/profile/ProfilePage";
import BusinessStatistic from "../pages/statistic/BusinessStatistic";

const AdminRoute = () => {
  const userInfo = getUserInfoFromLocalStorage();
  const history = useHistory();
  if (!userInfo) {
    history.push("/login");
  }

  return (
    <Switch>
      <Route path="/" exact>
        {userInfo?.roleId === ROLE_ID.ADMIN ? (
          <Redirect to="/dashboard/analytics" />
        ) : (
          <Redirect to="/dashboard/service" />
        )}
      </Route>
      <Route path="/dashboard/analytics" component={Analytics} exact />
      <Route path="/dashboard/socialMedia" component={SocialMedia} />
      <Route exact path="/dashboard/service" component={Service} />
      {userInfo?.roleId === ROLE_ID.ADMIN && (
        <Route
          exact
          path="/dashboard/service/config"
          component={ConfigService}
        />
      )}
      {userInfo?.roleId === ROLE_ID.COMPANY && (
        <>
          <Route exact path="/order" component={OrderPage} />
          <Route exact path="/order/:id" component={OrderDetailPage} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/members" component={Members} />
          <Route path="/groups" component={Groups} />
          <Route path="/business" component={Business} />
       
          <Route path="/form" component={CreateStaff} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/PieChart" component={Pie} />
          <Route path="/LineChart" component={Line} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/profile/payment" component={PaymentModal} />
        </>
      )}
      <Route path="/calendar" component={Calendar} />
      <Route path="/members" component={Members} />
      <Route path="/groups" component={Groups} />
      <Route path="/business" component={Business} />
  
      <Route path="/form" component={CreateStaff} />

      <Route path="/FAQ" component={FAQ} />
      <Route path="/business-statistics" component={BusinessStatistic} />
      <Route path="/PieChart" component={Pie} />
      <Route path="/LineChart" component={Line} />
      <Route path="/profile" exact component={ProfilePage} />
    </Switch>
  );
};
export default AdminRoute;
