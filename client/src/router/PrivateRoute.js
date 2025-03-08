import http from "@/services/httpServices";
import { useStoreMobx } from "@/stores";
import { decodeToken } from "@/utils/decodeToken";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { getToken } from "firebase/messaging";
import { authService } from "@/services/authServices";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { toast, toastError } from "@/utils/toast";
// import { messaging } from "../services/firebase";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { userStore, friendStore } = useStoreMobx();
  const userInfo = decodeToken(token);
  
  // async function requestPermission() {
  //   console.log("Requesting permission...");
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //       // Initialize Firebase
  //       getToken(messaging, {
  //         vapidKey:
  //           "BLK7lauTH8W1R_s3c_oWiYnFn6mBJ9eMGjQrYXIBZPeqsANIZMXvcZ1aBrf5ksh9oAXuN-nzWBAHL2bZSqnD1bQ",
  //       })
  //         .then((currentToken) => {
  //           if (currentToken) {
  //             console.log("currentToken: ", currentToken);
  //             // Save currentToken
  //             //...
  //           } else {
  //             console.log(
  //               "No registration token available. Request permission to generate one."
  //             );
  //           }
  //         })
  //         .catch((err) => {
  //           console.log("An error occurred while retrieving token. ", err);
  //         });
  //     } else {
  //       console.log("Do not have permission");
  //     }
  //   });
  // }

  useEffect(() => {
    
    if (userInfo) {
      // requestPermission();
    }

    if (userInfo && userInfo.userId) {
      authService.isAccessSystem(userInfo.userId).then(async (data) => {
        if (data === false) {
          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              token: null,
              user: null,
            },
          });
          toastError("Tài khoản của bạn đã bị chặn bởi nhà phát triển")
          localStorage.removeItem("accessToken");
          userStore.setIsAuthenticated(false)
        
        }
      });
      friendStore.getMyFriends();
      friendStore.getFriendsRequest();
      friendStore.getFriendsSuggest();
      http.get(`api/user/${userInfo.userId}`).then((res) => {
        const data = res.data.data;

        if (data && data.user && data.userDetail) {
          userStore.setUser(data.user);
          userStore.setUserDetail(data.userDetail);
        }
      });
    }
  }, []);
 
  const { children } = props;
  if (!userInfo) {
    
    return <Navigate to={"/login"} />;
  }
  userStore.setRoleId(userInfo.roleId);
  return children;
};

export default PrivateRoute;
