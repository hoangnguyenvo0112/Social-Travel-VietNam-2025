import Avatar from "@/components/Avatar";
import { ROLE_ID } from "@/const/role";
import userStore from "@/stores/userStore";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import "./sidebar.css";
function Sidebar() {
  const [indexActive, setIndexActive] = useState(0);
  const { auth } = useSelector((state) => state);
  const items = [
    {
      title: "Trang chủ",
      icons: [<HomeOutlinedIcon />, <HomeIcon />],
      path: "/",
    },
    {
      title: "Khám phá",
      icons: [<LocalOfferOutlinedIcon />, <LocalOfferIcon />],
      path: "/discover",
    },
    {
      title: "Nhóm",
      icons: [<GroupsOutlinedIcon />, <GroupsIcon />],
      path: "/group",
    },
    {
      title: "Cá nhân",
      icons: [<PersonOutlinedIcon />, <PersonIcon />],
      path: `/profile/${auth.user._id}`,
    },
  ];

  useEffect(() => {
    updateSideBar();
  }, [window.location.href]);

  const updateSideBar = () => {
    var currUrl = window.location.href;
    console.log("URL: ",currUrl);
    
    if (currUrl.includes("discover"))
    {
      setIndexActive(1);
      return;
    }
    
    if (currUrl.includes("group"))
    {
      setIndexActive(2);
      return;
    }
    
    if (currUrl.includes("trending"))
    {
      setIndexActive(3);
      return;
    }

    if (currUrl.includes("profile"))
    {
      setIndexActive(4);
      return;
    }

    if (currUrl.includes("setting"))
    {
      setIndexActive(5);
      return;
    }

    setIndexActive(0);
  }

  return (
    <div className="sticky top-[72px] right-0">
      <div className="sidebar" style={{ marginBottom: "20px" }}>
        <div className="flex cursor-pointer p-2 items-center">
          <Avatar src={userStore.user.avatar} size={"big-rounded-avatar"} />
          <div className="justify-between ml-3">
            <strong className="text-gray-600">
              {userStore.roleId == ROLE_ID.CLIENT
                ? userStore.userDetail.fullname
                : userStore.userDetail.companyName}
            </strong>
            <p className="text-gray-400">@{userStore.user.username}</p>
          </div>
        </div>
      </div>
      <div className="sidebar">
        {items.map((item, index) => (
          <SidebarItem
            onClick={() => {
              setIndexActive(index);
            }}
            className={"sidebar-item"}
            isActive={index === indexActive}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(Sidebar);
