import { useStore } from "@/stores";
import { formatMoneyVND } from "@/utils/string";
import { Box, Button, Modal, Typography } from "@mui/material";

const RequestPaymentModal = ({ open, onClose, onConfirm }) => {
  const {userStore}=useStore()

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
        <Typography variant="body1" align="center" mb={3}>
          Hiện trong tài khoản của bạn chỉ còn{" "}
          <b>{formatMoneyVND(userStore.user.money)}. Bạn cần nạp thêm tiền để đăng kí dịch vụ.</b>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={onConfirm} sx={{ mr: 2 }}>
            Nạp tiền
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RequestPaymentModal;
