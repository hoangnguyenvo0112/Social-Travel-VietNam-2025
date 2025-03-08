import NoNotice from "@/images/notice.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  NOTIFY_TYPES,
  deleteAllNotifies,
  isReadNotify,
} from "@/redux/actions/notifyAction";
import Avatar from "./Avatar";
import { useStoreMobx } from "@/stores";

const NotifyModal = () => {
  const { auth } = useSelector((state) => state);
  const { notificationStore } = useStoreMobx();

  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({
      type: NOTIFY_TYPES.UPDATE_SOUND,
      payload: !notificationStore.notifies.sound,
    });
  };

  const handleDeleteAll = () => {
    const newArr = notificationStore.notifies.filter(
      (item) => item.isRead === false
    );
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div className="prevent-select" style={{ minWidth: "300px" }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Thông báo</h3>
        {notificationStore.notifies.sound ? (
          <i
            className="fas fa-bell text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        )}
      </div>
      <hr className="mt-2" />

      {notificationStore.notifies.map === 0 && (
        <img src={NoNotice} alt="NoNotice" className="w-100" />
      )}

      <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        {notificationStore.notifies.map(
          (msg, index) =>
            msg &&
            msg.user && (
              <div key={index} className="px-2 mb-3">
                <Link
                  to={`${msg.url}`}
                  className="d-flex text-dark align-items-center"
                  onClick={() => handleIsRead(msg)}
                >
                  <Avatar
                    src={msg.user ? msg.user.avatar : ""}
                    size="big-avatar"
                  />

                  <div className="mx-1 flex-fill">
                    <div>
                      <strong className="mr-1">{msg.user.username}</strong>
                      <span>{msg.text}</span>
                    </div>
                    {msg.content && (
                      <small>{msg.content.slice(0, 20)}...</small>
                    )}
                  </div>

                  {msg.image && (
                    <div style={{ width: "50px" }}>
                      {msg.image.match(/video/i) ? (
                        <video src={msg.image} width="100%" />
                      ) : (
                        <Avatar src={msg.image} size="medium-avatar" />
                      )}
                    </div>
                  )}
                </Link>
                <small className="text-muted d-flex items-center px-2">
                  {moment(msg.createdAt).fromNow()}
                  {!msg.isRead && (
                    <span className="relative flex ml-2">
                      <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-60"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                  )}
                </small>
              </div>
            )
        )}
      </div>

      <hr className="my-1" />
      <div
        className="text-right text-danger mr-2"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteAll}
      >
        Xóa tất cả
      </div>
    </div>
  );
};

export default NotifyModal;
