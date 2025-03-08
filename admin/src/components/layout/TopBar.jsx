import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { localStorageHelper } from "../../services/localStorage";
import { useStore } from "../../stores";
import { ColorModeContext, tokens } from "../../theme/theme";
import { LOCAL_STORAGE_KEY } from "@/utils/constant";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory();

  const { userStore } = useStore();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = (event) => {
    handleClose(event);
    // LogOUT
    localStorageHelper.remove(LOCAL_STORAGE_KEY.accessToken)
    window.location.reload()
    userStore.setIsAuthenticated(false);
  };

  const openProfile = (event) => {
    handleClose(event);
    history.push("/profile");
  };

  const openAccount = (event) => {
    handleClose(event);
    history.push("/account");
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* TAG */}
        <Box
          display="flex"
          backgroundColor={colors.custom[100]}
          p={1}
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
          }}
          borderRadius="3px"
        >
          <Typography variant="h4" color={colors.custom[300]} noWrap>
            Travel&nbsp;
          </Typography>
          <Typography variant="h4" color={"#F1C40F"} noWrap>
            Bee
          </Typography>
        </Box>
        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton ref={anchorRef} onClick={handleToggle}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={openProfile}>Hồ sơ</MenuItem>
                    <MenuItem onClick={openAccount}>Tài khoản của tôi</MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};

export default TopBar;
