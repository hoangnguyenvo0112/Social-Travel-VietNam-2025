import { tokens } from "@/theme/theme";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Box, useTheme } from "@mui/material";
import { useStore } from "@/stores";
import { ROLE_ID } from "@/utils/constant";

import { ProfileCard } from "@/components/ProfileCard";
import { formatMoneyVND } from "@/utils/string";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import { userManagerService } from "@/services/userManager.services";
const CompanyViewer = () => {

  const [packageNumber, setPackageNumber] = useState();
  useEffect(() => {
    userManagerService.getPackageManager().then(data => setPackageNumber(data?.packageOrder?.total))
  }, []);

  const { userStore } = useStore();
  const { user } = userStore;
  console.log(toJS(user));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        title="Tổng tiền hiện tại"
        numberOfStyle={0}
        number={formatMoneyVND(user.money)}
      />
      <ProfileCard
        title="Số người theo dõi"
        numberOfStyle={1}
        number={user?.followers?.length}
        icon={<PermIdentityOutlinedIcon fontSize="medium" />}
      />
      <ProfileCard
        title="Gói du lịch còn lại"
        numberOfStyle={2}
        number={packageNumber}
        icon={<CorporateFareOutlinedIcon fontSize="medium" />}
      />
    </Box>
  );
};

export default CompanyViewer;
