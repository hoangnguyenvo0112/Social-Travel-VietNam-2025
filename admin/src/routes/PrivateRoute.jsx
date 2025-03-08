import { useStore } from "@/stores";
import { getUserInfoFromLocalStorage } from "@/utils/decodeToken";

import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  
  const userInfo = getUserInfoFromLocalStorage();
  const { children } = props;
  if (!userInfo) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;
