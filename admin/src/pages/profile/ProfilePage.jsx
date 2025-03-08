import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { tokens } from "../../theme/theme";

import { useStore } from "@/stores";
import { ROLE_ID } from "@/utils/constant";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { ActiveAvatar, HashTag } from "../../components/DashItem";
import AdminViewer from "./AdminViewer";
import CompanyViewer from "./CompanyViewer";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/EditProfile";
import MyProfile from "./components/MyProfile";
import Recharge from "./components/Recharge";
import SystemSetting from "./components/SystemSetting";

const ProfilePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const { userStore } = useStore();

  const { user } = userStore;

  const [render, setRender] = useState("myProfile");
  useEffect(() => {
    const type = new URLSearchParams(location.search).get("type");
    if (type === "recharge") {
      setRender("recharge");
    }
  }, []);
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      {/* ROW 1 */}
      {user.role.roleId === ROLE_ID.ADMIN && <AdminViewer />}
      {user.role.roleId === ROLE_ID.COMPANY && <CompanyViewer />}
      <Box
        gridColumn="span 4"
        gridRow="span 4"
        backgroundColor={colors.custom[100]}
        sx={{
          boxShadow: (theme) => (theme.palette.mode === "dark" ? undefined : 1),
          borderRadius: (theme) =>
            theme.palette.mode === "dark" ? undefined : "5px",
        }}
      >
        <Box
          mt="20px"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          {
            <ActiveAvatar
              avatar={user ? user.avatar : ""}
              name={user ? user.fullname : "loading..."}
            />
          }

          <Typography variant="h4" fontWeight={"700"} marginTop={"15px"}>
            {user ? user.fullname : "loading..."}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"400"}
            marginTop={"2px"}
            color={colors.grey[400]}
          >
            {user ? user.email : "loading..."}
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={"10px"}
          spacing={1}
        >
          <HashTag
            content={user ? user?.role?.roleName : "admin"}
            kindOfColor={0}
          />
          <HashTag content={user?.gender ? user.gender : "male"} kindOfColor={1} />
          <HashTag content={"Top follow"} kindOfColor={2} />
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          marginTop={"10px"}
          marginLeft={"20px"}
          spacing={1}
        >
          <Typography
            variant="h4"
            fontWeight={"700"}
            color={colors.grey[100]}
            marginBottom={"10px"}
          >
            Mục lục
          </Typography>
          <Button
            variant="outlined"
            padding={"5px"}
            borderRadius={"4px"}
            onClick={() => setRender("myProfile")}
            startIcon={<PermIdentityIcon />}
          >
            <Typography
              variant="h6"
              fontWeight={"400"}
              color={colors.custom[300]}
            >
              Thông tin cá nhân
            </Typography>
          </Button>
          <Button
            variant="outlined"
            padding={"5px"}
            borderRadius={"4px"}
            onClick={() => setRender("editProfile")}
            startIcon={<BorderColorOutlinedIcon />}
          >
            <Typography
              variant="h6"
              fontWeight={"400"}
              color={colors.custom[300]}
            >
              Chỉnh sửa thông tin
            </Typography>
          </Button>
          {/* {user.role.roleId === ROLE_ID.ADMIN && (
            <Button
              variant="outlined"
              padding={"5px"}
              borderRadius={"4px"}
              onClick={() => setRender("accountSetting")}
              startIcon={<SettingsOutlinedIcon />}
            >
              <Typography
                variant="h6"
                fontWeight={"400"}
                color={colors.custom[300]}
              >
                Thiết lập hệ thống
              </Typography>
            </Button>
          )} */}

          {user.role.roleId === ROLE_ID.COMPANY && (
            <Button
              variant="outlined"
              padding={"5px"}
              borderRadius={"4px"}
              onClick={() => setRender("recharge")}
              startIcon={<AddCardOutlinedIcon />}
            >
              <Typography
                variant="h6"
                fontWeight={"400"}
                color={colors.custom[300]}
              >
                Nạp tiền vào hệ thống
              </Typography>
            </Button>
          )}

          <Button
            variant="outlined"
            padding={"5px"}
            borderRadius={"4px"}
            onClick={() => setRender("changePassword")}
            startIcon={<LockResetOutlinedIcon />}
          >
            <Typography
              variant="h6"
              fontWeight={"400"}
              color={colors.custom[300]}
            >
              Đổi mật khẩu
            </Typography>
          </Button>
        </Stack>
      </Box>
      {/* ROW 2 */}
      <Box
        gridColumn="span 8"
        gridRow="span 3"
        justifyContent="center"
        alignItems="center"
        backgroundColor={colors.custom[100]}
        sx={{
          boxShadow: (theme) => (theme.palette.mode === "dark" ? undefined : 1),
          borderRadius: (theme) =>
            theme.palette.mode === "dark" ? undefined : "5px",
        }}
        overflow="auto"
      >
        {render === "myProfile" && <MyProfile />}
        {render === "recharge" && <Recharge />}
        {/* {render === "accountSetting" && <SystemSetting />} */}
        {render === "changePassword" && <ChangePassword />}
        {render === "editProfile" && <EditProfile />}
      </Box>
    </Box>
  );
};

export default observer(ProfilePage);
