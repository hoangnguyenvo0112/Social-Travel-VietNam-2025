import { follow, unfollow } from "@/redux/actions/profileAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (
      auth.user &&
      auth.user.following &&
      auth.user.following.find((item) => item._id === user._id)
    ) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          className="whitespace-nowrap rounded-sm p-2 "
          style={{
            backgroundColor: "var(--danger-bg)",
            color: "#fff",
            outline: "none",
          }}
          onClick={handleUnFollow}
        >
          Hủy theo dõi
        </button>
      ) : (
        <button
          className="whitespace-nowrap rounded-sm p-2 "
          style={{
            backgroundColor: "var(--success-bg)",
            color: "#fff",
            outline: "none",
          }}
          onClick={handleFollow}
        >
          Theo dõi
        </button>
      )}
    </>
  );
};

export default FollowBtn;
