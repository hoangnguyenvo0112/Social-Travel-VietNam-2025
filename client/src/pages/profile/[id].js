import { useEffect, useState } from "react";

import Info from "@/components/profile/Info";
import Posts from "@/components/profile/Posts";
import Saved from "@/components/profile/Saved";

import LoadIcon from "@/images/loading.gif";
import { getProfileUsers } from "@/redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
 
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className="profile">
      {profile.loading ? (
        <div className="mt-12">
          <Loading />
        </div>
      ) : (
        <>
          <Info dispatch={dispatch} id={id} />
          {auth.user._id === id && (
            <div className="profile_tab">
              <button
                className={saveTab ? "" : "active"}
                onClick={() => setSaveTab(false)}
              >
                Bài đăng
              </button>
              <button
                className={saveTab ? "active" : ""}
                onClick={() => setSaveTab(true)}
              >
                Đã lưu
              </button>
            </div>
          )}
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
