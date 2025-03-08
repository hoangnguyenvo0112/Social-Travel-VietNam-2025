import UserImg from "@/assets/image/user.jpg";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useHistory } from "react-router-dom";
import { tokens } from "../../theme/theme";

import { useStore } from "@/stores";
import { ROLE_ID } from "@/utils/constant";
import { observer } from "mobx-react-lite";
import "react-pro-sidebar/dist/css/styles.css";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography marginLeft={"10px"} variant="h6">
        {title}
      </Typography>
      <Link to={to}></Link>
    </MenuItem>
  );
};

const SidebarPro = () => {
  const theme = useTheme();
  const { userStore } = useStore();
  const user = userStore.user;

  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const history = useHistory();
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [role, setRole] = useState("admin");
  return (
    <Box
      position="sticky"
      top={0}
      height="100vh"
      zIndex={1000}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.custom[100]} !important`,
          minHeight: "100vh",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          height: "32px",
          padding: "2px 20px 2px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.blueAccent[600]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[500]} !important`,
        },
        "& .pro-sub-menu.open": {
          color: `${colors.blueAccent[600]} !important`,
        },
        "& .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item":
          {
            backgroundColor: isCollapsed
              ? `${colors.custom[500]} !important`
              : `${colors.custom[100]} !important`,
          },
        "& .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item > .popper-inner":
          {
            backgroundColor: `${colors.custom[100]} !important`,
            boxShadow:
              theme.palette.mode === "dark"
                ? undefined
                : "rgba(149,157,165,0.2) 0px 8px 24px",
          },
        "& .pro-inner-list-item .popper-element": {
          margin: "10px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={handleCollapsed}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="button" color={colors.grey[100]}>
                  {user.role.roleId === ROLE_ID.ADMIN && "ADMIN"}
                  {user.role.roleId === ROLE_ID.STAFF && "STAFF"}
                  {user.role.roleId === ROLE_ID.COMPANY && "COMPANY"}
                </Typography>
                <IconButton onClick={handleCollapsed}>
                  <MenuOutlinedIcon fontSize="30" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="10px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => history.push("/profile")}
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user === null ? UserImg : user?.avatar}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                {/* <Link to="/userProfile"/> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                >
                  {user === null ? "Nguyen Van A" : user?.username}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {user === null ? "Administrator" : user?.roleName}
                </Typography>
              </Box>
            </Box>
          )}
        </Menu>
        {/* MENU ITEM */}
        <SidebarContent>
          {user.role.roleId === ROLE_ID.ADMIN && (
            <AdminSideBar selected={selected} setSelected={setSelected} />
          )}
       
          {user.role.roleId==ROLE_ID.COMPANY && (
            <BusinessSideBar selected={selected} setSelected={setSelected} />
          )}
        </SidebarContent>
      </ProSidebar>
    </Box>
  );
};

export default observer(SidebarPro);

const BusinessSideBar = ({ selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Menu>
      <Item
        title="Dịch vụ"
        selected={selected}
        setSelected={setSelected}
        to="/dashboard/service"
        icon={<SupportAgentIcon />}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "10px 0 5px 10px" }}
      >
        Dữ liệu
      </Typography>
      <Item
        title="Hồ sơ"
        to="/profile"
        icon={<ContactsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
     
      
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 10px" }}
      >
        Trang thông tin
      </Typography>
     
      <Item
        title="Lịch"
        to="/calendar"
        icon={<CalendarTodayOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="FAQ"
        to="/FAQ"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
   
    
    
     
      
    </Menu>
  );
};



const AdminSideBar = ({ selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userStore } = useStore();
  const user = userStore.user;
  return (
    <Menu>
      <SubMenu
        style={{ color: colors.grey[100] }}
        icon={<HomeOutlinedIcon />}
        title={"Bảng điều khiển"}
      >
        {user.role.roleId === ROLE_ID.ADMIN && (
          <Item
            title="Phân tích"
            selected={selected}
            setSelected={setSelected}
            to="/dashboard/analytics"
          />
        )}

        <Item
          title="Truyền thông xã hội"
          selected={selected}
          setSelected={setSelected}
          to="/dashboard/socialMedia"
        />
        <Item
          title="Dịch vụ"
          selected={selected}
          setSelected={setSelected}
          to="/dashboard/service"
        />
      </SubMenu>
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "10px 0 5px 10px" }}
      >
        Dữ liệu
      </Typography>
      <Item
        title="Thành viên"
        to="/members"
        icon={<ContactsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Thông tin hội nhóm"
        to="/groups"
        icon={<PeopleOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Doanh nghiệp"
        to="/business"
        icon={<ReceiptOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 10px" }}
      >
        Trang thông tin
      </Typography>
    
      <Item
        title="Lịch"
        to="/calendar"
        icon={<CalendarTodayOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="FAQ"
        to="/FAQ"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 10px" }}
      >
        Danh sách biểu đồ
      </Typography>
      <Item
        title="Thống kê tổng quan"
        to="/business-statistics"
        icon={<BarChartOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Thống kê gói dịch vụ"
        to="/PieChart"
        icon={<PieChartOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Thống kê trong năm"
        to="/LineChart"
        icon={<TimelineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
     
    </Menu>
  );
};
