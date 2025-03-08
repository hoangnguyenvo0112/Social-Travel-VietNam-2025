import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import userStore from "@/stores/userStore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import AddFriendButton from "../AddFriendButton";
import Avatar from "../Avatar";
import FollowBtn from "../FollowBtn";
import EditProfile from "./EditProfile";
import Followers from "./Followers";
import Following from "./Following";
import MutualFriend from "./MutualFriend";

const Info = ({ id, dispatch }) => {
  const { profile } = useSelector((state) => state);
  const [userData, setUserData] = useState({});
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showMutualFriend, setShowMutualFriend] = useState(false);

  useEffect(() => {
    if (id === userStore.user._id) {
      setUserData({ ...userStore.userDetail, ...userStore.user });
    } else {
      setUserData({
        ...profile.userInfo.userDetail,
        ...profile.userInfo.user,
        ...profile.userInfo.status,
      });
    }
  }, [id, profile, dispatch,userStore.userDetail]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="my-3 rounded-md shadow-sm" >
      <div className=" p-3 bg-white md:flex items-center " key={userData._id}>
        <div className="info_avatar">
          <Avatar src={userData.avatar} custom={100} />
        </div>
        <div className="md:flex flex-[4] justify-between items-center">
          <div className="">
            <div className="flex items-center md:justify-start justify-center">
              <strong className="text-gray-600 text-[24px]">{userData?.fullname  ? userData.fullname : userData?.companyName}</strong>
              <div class="text-blue-500 ml-1"><VerifiedIcon sx={{ fontSize: "24px" }} /></div>
            </div>
            <p className="text-gray-400 flex md:justify-start justify-center">@{userData.username}</p>
            <div className="md:mt-4 mt-2 flex md:justify-start justify-center">
              {userData._id === userStore.user._id ? (
                <button className="bg-green-500 p-2 rounded-md text-white hover:opacity-80 " onClick={() => setOnEdit(true)}>
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                <div className="flex ">
                  <FollowBtn user={userData} />
                  {!!userData && (
                    <AddFriendButton user={userData} className="ml-2" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center md:justify-start justify-center">
              <p>{(userData.followers && userData.followers.length) || 0} Người theo dõi</p>
              <Tooltip title="Mở danh sách người theo dõi" arrow>
                <IconButton
                  type="button"
                  className="focus:outline-none"
                  sx={{ p: 1, color: "#3b82f6" }}
                  onClick={() => setShowFollowers(true)}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex items-center md:justify-start justify-center">
              <p>{(userData.following && userData.following.length) || 0} Đang theo dõi</p>
              <Tooltip title="Mở danh sách người đang theo dõi" arrow>
                <IconButton
                  type="button"
                  className="focus:outline-none"
                  sx={{ p: 1, color: "#dc3545" }}
                  onClick={() => setShowFollowing(true)}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </div>
            {
              userData._id !== userStore.user._id && (
                <div className="flex items-center md:justify-start justify-center">
                  <p>{(userData.following && userData.following.length) || 0} Bạn chung</p>
                  <Tooltip title="Mở danh sách bạn chung" arrow>
                    <IconButton
                      type="button"
                      className="focus:outline-none"
                      sx={{ p: 1, color: "#fcc700" }}
                      onClick={() => setShowMutualFriend(true)}
                    >
                      <PeopleAltIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <hr />
      <div className=" p-3 bg-white md:flex md:justify-start justify-center items-start info_bottom">
        <div className="flex-[1] md:mb-0 mb-3 flex justify-center">
          <QRCode
            size={64}
            style={{ height: "auto", maxWidth: "100%", width: "100px" }}
            value={window.location.href}
            viewBox={`0 0 32 32`}
          />
        </div>
        <div className="flex-[3] md:ml-3">

          <div className="flex text-blue-500 items-center">
            <PersonIcon sx={{ fontSize: "18px" }} />
            <p className="ml-1">{userData.fullname}</p>
          </div>
          <div className="flex text-red-500 items-center">
            <SmartphoneIcon sx={{ fontSize: "18px" }} />
            <p className="ml-1 ">{userData.mobile}</p>
          </div>
          <div className="flex  text-purple-500 items-center">
            <LocationOnIcon sx={{ fontSize: "18px" }} />
            <p className="ml-1">{userData.address}</p>
          </div>
          <div className="flex  text-orange-500 items-center">
            <MarkunreadIcon sx={{ fontSize: "18px" }} />
            <p className="ml-1">{userData.email}</p>
          </div>
          <div className="flex  text-blue-500 items-center">
            <LanguageIcon sx={{ fontSize: "18px" }} />
            <a
              className="underline ml-1"
              href={`https://${userData.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {userData.website}
            </a>
          </div>
          <div className="flex  text-gray-500 items-start">
            <MarkunreadIcon sx={{ fontSize: "18px", marginTop: "4px" }} />
            <p className="ml-1 line-clamp-3">{userData.story}</p>
          </div>


        </div>

      </div>
      {onEdit && (
        <EditProfile user={userData} setOnEdit={setOnEdit} />
      )}

      <Followers
        users={userData.followers}
        setShowFollowers={setShowFollowers}
        showFollowers={showFollowers}
      />

      <Following
        users={userData.following}
        setShowFollowing={setShowFollowing}
        showFollowing={showFollowing}
      />

      <MutualFriend
        // chỉnh lại userData.mutualFriend
        users={userData.following}
        setShowMutualFriend={setShowMutualFriend}
        showMutualFriend={showMutualFriend}
      />

    </div>
  );
};

export default observer(Info);


