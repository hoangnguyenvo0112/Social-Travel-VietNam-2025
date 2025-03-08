import { useStore } from "@/stores";
import { ROLE_ID } from "@/utils/constant";
import { formatMoneyVND } from "@/utils/string";
import { makeStyles, useTheme } from "@material-ui/core";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
    transition: "transform 0.3s, background-color 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  price: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  button: {
    marginTop: "auto",
    borderRadius: "30px",
    padding: "10px 30px",
    fontWeight: "bold",
    boxShadow: "none",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Pricing = ({ packages }) => {

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { userStore } = useStore();

  const plans = [
    {
      title: "Gói cơ bản",
      price: "200.000 vnđ",
      description:
        "Được phép đăng 3 bài giới thiệu. Được hỗ trợ trực tiếp trong vòng 5h.",
    },
    {
      title: "Gói nâng cao",
      price: "500.000 vnđ",
      description:
        "Được phép đăng 8 bài giới thiệu. Được hỗ trợ trực tiếp trong vòng 3h.",
    },
    {
      title: "Gói đặc biệt",
      price: "1.000.000 vnđ",
      description:
        "Được phép đăng 20 bài giới thiệu. Được hỗ trợ trực tiếp trong vòng 1h.",
    },
  ];
  if(!packages||packages.length==0){
    return <></>
  }

  return (
    <Grid container spacing={4}>
      {packages.map((item, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="h4" className={classes.price}>
                {formatMoneyVND(item.price)}
              </Typography>
              <Typography className={classes.description}>
                {item.description}
              </Typography>
            </CardContent>
            {userStore.user.role.roleId === ROLE_ID.COMPANY && (
              <Button
                onClick={() => {
                  history.push("/order",{item:item});
                }}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                <span style={{ color: theme.palette.primary.contrastText }}>
                  Đăng ký
                </span>
              </Button>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Pricing;
