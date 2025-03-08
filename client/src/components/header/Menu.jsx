import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/actions/authAction";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import userStore from "@/stores/userStore";
import { observer } from "mobx-react";
import { useStoreMobx } from "@/stores";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Menu = () => {
  const { auth } = useSelector((state) => state);
  const { notificationStore } = useStoreMobx();

  const navLinks = [
    { label: "Home", icon: <HomeOutlinedIcon sx={{fontSize: 32}} />, icon_active: <HomeIcon sx={{fontSize: 32}} />, path: "/" },
    { label: "Message", icon: <MarkUnreadChatAltOutlinedIcon sx={{fontSize: 32}} />, icon_active: <MarkUnreadChatAltIcon sx={{fontSize: 32}} />, path: "/message" },
    { label: "Market", icon: <ShoppingBagOutlinedIcon sx={{fontSize: 32}} />, icon_active: <ShoppingBagIcon sx={{fontSize: 32}} />, path: `${auth.user.role.roleName == "company" ? "/shop" : "/market"}` },
    { label: "Friend", icon: <PeopleAltOutlinedIcon sx={{fontSize: 32}} />, icon_active: <PeopleAltIcon sx={{fontSize: 32}} />, path: "/friends" },
  ];

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };



  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link text-blue-800" to={link.path}>
              {isActive(link.path) ? link.icon_active : link.icon}
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link relative flex"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
          
            {notificationStore.notifies.length > 0 ?
              <div className="text-red-500 ">
                <NotificationsActiveIcon sx={{fontSize: 32}} />
              </div> :
              <div className="text-blue-800">
                <NotificationsIcon sx={{fontSize: 32}} />
              </div>
            }

            <span className="notify_length">
              {notificationStore.notifies.length > 0
                ? notificationStore.notifies.filter(item=>item.isRead===false).length
                : 0}
            </span>
            {notificationStore.notifies.length > 0 && (
              <span class="animate-ping absolute inline-flex h-[20px] mt-1 ml-1 w-[20px]  rounded-full bg-red-400 opacity-60"></span>
            )}
          </span>

          <div
            className="dropdown-menu min-w-[300px]"
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(60px)" }}
          >
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={userStore.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/`}>
              <i className="fas fa-home mr-2"></i>
              Trang chủ
            </Link>
            <Link className="dropdown-item" to={`/discover`}>
              <i className="fas fa-tag mr-2"></i>
              Khám phá
            </Link>
            <Link className="dropdown-item" to={`/group`}>
              <i className="fas fa-users mr-2"></i>
              Nhóm
            </Link>
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              <i className="fas fa-user-circle mr-2"></i>
              Cá nhân
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Đăng xuất
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default observer(Menu);
