import { useStore } from "@/stores";
import { formatMoneyVND } from "@/utils/string";
import { Box, Button, Modal, Typography } from "@mui/material";

const OrderConfirmationModal = ({ open, onClose, onConfirm, item }) => {
  const { userStore } = useStore();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" component="h2" align="center" mb={2}>
          Xác nhận thanh toán
        </Typography>
        <Typography variant="body1" align="center" mb={3}>
          Hiện trong tài khoản của bạn còn{" "}
          <b>{formatMoneyVND(userStore.user.money)}.</b> Sau khi thanh toán, bạn
          sẽ bị trừ <b>{formatMoneyVND(item.price)}</b> từ tài khoản.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={onConfirm} sx={{ mr: 2 }}>
            Xác nhận
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderConfirmationModal;
