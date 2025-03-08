import { userManagerService } from "@/services/userManager.services";
import { getUserInfoFromLocalStorage } from "@/utils/decodeToken";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminRoute from "../../routes/AdminRoute";
import { tokens } from "../../theme/theme";
import SidebarPro from "./SidebarPro";
import TopBar from "./TopBar";
import { useStore } from "@/stores";
import { useHistory } from "react-router-dom";

const AdminLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userStore } = useStore()
  const history=useHistory()
  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    if (!userInfo || !userInfo.userId || !userInfo.roleId) {
      return history.push('/login')
    }
    userManagerService.getUserInfoFromBO().then((data) => {
      if (!data || !data.user) {
        return history.push('/login')
      }
      userStore.setIsAuthenticated(true);
      userStore.setUser(data.user);
      userStore.setUserDetail(data.userDetail);
    });
  }, []);
  return (
    <BrowserRouter>
      <Route
        render={() => (
          <div style={{ display: "flex" }}>
            <SidebarPro />
            <main style={{ flexGrow: 1, backgroundColor: colors.custom[500] }}>
              <TopBar />
              <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <AdminRoute />
              </div>
            </main>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default AdminLayout;
