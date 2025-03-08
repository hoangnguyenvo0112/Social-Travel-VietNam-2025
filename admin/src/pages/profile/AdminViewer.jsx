import { tokens } from "@/theme/theme";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Box, useTheme } from "@mui/material";
import { ProfileCard } from "@/components/ProfileCard";
import { useEffect, useState } from "react";
import { userManagerService } from "@/services/userManager.services";
import { groupService } from "@/services/groupServices";
import { useStore } from "@/stores";
import { formatMoneyVND } from "@/utils/string";

const AdminViewer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [groups, setGroups] = useState([]);
  const [company, setCompany] = useState([]);
  const {userStore}=useStore()

  useEffect(() => {
    groupService.getAllGroup().then((data) => {
      const dataRes = data.map((group) => {
        return {
          id: group._id,
          name: group.name,
          numberMember: group.members.length,
          creator: group.creator.username,
          email: group.creator.email,
        };
      });
      setGroups(dataRes);
    });

    userManagerService.getCompany().then(async (data) => {
      const dataRes = await data.map((item, index) => {
        return {
          ...item,
          companyName: item.companyName,
          taxCode: item.taxCode,

          phoneNumber: `03529524${index}`,
          email: item.user?.email,
          cost: item.user?.money,
        };
      });
      setCompany(dataRes);
    });

  }, []);
  return (
    <Box
      gridColumn="span 8"
      gridRow="span 1"
      backgroundColor={colors.custom[100]}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      sx={{
        boxShadow: (theme) => (theme.palette.mode === "dark" ? undefined : 1),
        borderRadius: (theme) =>
          theme.palette.mode === "dark" ? undefined : "5px",
      }}
    >
      <ProfileCard
        title="Tổng doanh thu của hệ thống"
        numberOfStyle={0}
        number={formatMoneyVND(userStore.totalRevenue)}
      />
      <ProfileCard
        title="Tổng hội nhóm quản trị"
        numberOfStyle={1}
        number={`${groups.length} hội nhóm`}
        icon={<PermIdentityOutlinedIcon fontSize="medium" />}
      />
      <ProfileCard
        title="Tổng tài khoản doanh nghiệp"
        numberOfStyle={2}
        number={`${company.length} tài khoản`}
        icon={<CorporateFareOutlinedIcon fontSize="medium" />}
      />
    </Box>
  );
};

export default AdminViewer;
