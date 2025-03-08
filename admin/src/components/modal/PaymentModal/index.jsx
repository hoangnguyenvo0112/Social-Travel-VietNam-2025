import { paymentService } from "@/services/payment.services";
import userStore from "@/stores/userStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [paymentInfo, setPaymentInfo] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    paymentService
      .verifyPayment(token)
      .then((data) => {
        setIsLoading(false);
        setPaymentInfo(data);
        
      })
      .catch((err) => {
        setPaymentInfo(null);
      });
  }, []);

  const handleClose = () => {
    history.push('/dashboard/service')
    window.location.reload()
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoading ? (
          <></>
        ) : (
          <Box sx={style}>
            {paymentInfo &&paymentInfo.message ? (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {paymentInfo.message}
              </Typography>
            ) : (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Đã xảy ra lỗi, vui lòng liên hệ với chúng tôi để xử lý
              </Typography>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              className="w-full"
            >
              <Button
                onClick={() => {
                  history.push('/dashboard/service')
                  window.location.reload()
                }}
                color="success"
              >
                Quay lại
              </Button>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
