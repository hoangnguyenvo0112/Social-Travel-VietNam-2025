import Peer from "peerjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.min.css";
import SocketClient from "./SocketClient";
import StatusModal from "./components/StatusModal";
import Alert from "./components/alert/Alert";
import CallModal from "./components/message/CallModal";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { getNotifies } from "./redux/actions/notifyAction";
import { getPosts } from "./redux/actions/postAction";
import { router } from "./router";

import { useStoreMobx } from "./stores";
import { setLocaleVietNam } from "./utils/dateTime";

function App() {
  const { auth, status, modal, call } = useSelector((state) => state);
  const { socketStore, notificationStore } = useStoreMobx();
  setLocaleVietNam();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && Object.keys(auth).length === 0 && user) {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: token,
          user: JSON.parse(user),
        },
      });
    }
  }, [auth]);

  useEffect(() => {
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socketStore.socket });
    return () => socketStore.socket.close();
  }, [dispatch, socketStore.socket]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      notificationStore.getNotification();
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
     // secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <>
      <Alert />
      <ToastContainer />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {/* {auth.token && <Header />} */}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;
