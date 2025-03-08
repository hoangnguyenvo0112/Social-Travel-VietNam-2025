import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { overrideTailwindClasses } from "tailwind-override";

const UserCard = ({
  children,
  user,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  button1,
  button2,
  msg,
  classNameTitle
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div>{user.text}</div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <i className="fas fa-image" />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? "videocam_off"
                : "phone_disabled"
              : user.call.video
                ? "video_camera_front"
                : "call"}
          </span>
        )}
      </>
    );
  };

  return (
    <div className={`user-card d-flex p-2 items-center justify-between w-full`}>
      <div className={`w-full ${classNameTitle?"":"hover:bg-[#f1f5f9]"}  hover:rounded-3xl`}>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <Avatar src={user.avatar} size="big-avatar" />

          <div
            className={
              overrideTailwindClasses(`${msg}
              ? "username_leftSide_mess ml-2 color-Black"
              : "username ml-2 color-Black" ${classNameTitle}`)
            }
          >
            <span className="d-block">
              {user.username}
            </span>

            <small>{msg ? showMsg(user) : user.fullname}</small>
          </div>
        </Link>
      </div>
      <div className="flex">
        {button1 && <div>{button1}</div>}
        {button2 && <div className="ml-1">{button2}</div>}
      </div>
      {children}
    </div>
  );
};

export default UserCard;
