import Pricing from "@/components/pricing";
import { userManagerService } from "@/services/userManager.services";
import { useStore } from "@/stores";
import { ROLE_ID } from "@/utils/constant";
import { Button, Grid, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Service = () => {
  const { userStore } = useStore();
  const theme = useTheme();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    userManagerService.getListPackage().then((data) => {
      setPackages(data);
    });
  }, []);

  if (userStore.user.role.roleId === -1) {
    return <></>;
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent={packages.length==0?'':"center"}
      style={{ minHeight: "80vh", paddingLeft: "30px", paddingRight: "30px" }}
    >
      {userStore.user.role.roleId === ROLE_ID.ADMIN && (
        <div style={{ marginBottom: "35px" }}>
          <Link to="service/config">
            <Button variant="outlined" color="info" sx={{ fontSize: "16px" }}>
              Cập nhật
            </Button>
          </Link>
        </div>
      )}

      <Pricing packages={packages} />
    </Grid>
  );
};

export default observer(Service);
