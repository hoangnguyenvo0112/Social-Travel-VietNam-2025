import OrderConfirmationModal from "@/components/modal/OrderConfirmModal";
import RequestPaymentModal from "@/components/modal/RequestPaymentModal";
import { userManagerService } from "@/services/userManager.services";
import { useStore } from "@/stores";
import { formatMoneyVND } from "@/utils/string";
import { toast } from "@/utils/toast";
import { makeStyles } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1),
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  orderDetails: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const OrderPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { item } = location.state;
  const { userStore } = useStore();

  const [openConfirmOrderModal, setOpenConfirmOrderModal] = useState(false);
  const [openRequestPaymentModal, setOpenRequestPaymentModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform further actions with the form data, such as submitting it to a server
    // You can access the form data using the appropriate variables (e.g., companyName, email, etc.)
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Typography variant="h6" className={classes.title}>
          Chi tiết đơn hàng
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Tên công ty: </strong> {userStore.userDetail.companyName}
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Email: </strong>
          {userStore.user.email}
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Tên gói: </strong>
          {item.title}
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Giá: </strong> {formatMoneyVND(item.price)}
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Số bài được phép đăng: </strong>
          {item.numberOfPost}
        </Typography>
        <Typography variant="body1" className={classes.orderDetails}>
          <strong>Chi tiết: </strong>
          {item.description}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="error"
            className={classes.button}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              if (userStore.user.money < item.price) {
                setOpenRequestPaymentModal(true);
              } else {
                setOpenConfirmOrderModal(true);
              }
            }}
            type="submit"
            variant="contained"
            color="info"
            className={classes.button}
          >
            Thanh toán
          </Button>
        </div>

        <OrderConfirmationModal
          item={item}
          onConfirm={() => {
           
            userManagerService
              .registerPackage(item._id)
              .then((res) => {
                toast("Thanh toán đơn hàng thành công.");
                history.push(`/order/${res._id}`);
              })
              .catch((err) => {
                toast("Có lỗi xảy ra vui lòng thử lại sau.");
              });
          }}
          onClose={() => {
            setOpenConfirmOrderModal(false);
          }}
          open={openConfirmOrderModal}
        />
        <RequestPaymentModal
          onClose={() => {
            setOpenRequestPaymentModal(false);
          }}
          onConfirm={() => {
            history.push("/profile?type=recharge");
          }}
          open={openRequestPaymentModal}
        />
      </form>
    </Container>
  );
};

export default OrderPage;
