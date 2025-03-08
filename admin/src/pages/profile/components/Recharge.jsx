import { paymentService } from "@/services/payment.services";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { tokens } from "../../../theme/theme";

const Recharge = () => {
  const [amount, setAmount] = useState(10000);
  const [bankCode, setBankCode] = useState("VNBANK");
  const [locale, setLocale] = useState("vn");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box padding={"20px"}>
      <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
        Nạp tiền vào hệ thống
      </Typography>
      <Typography marginTop={"20px"}>Số tiền nạp (VNĐ)</Typography>
      <NumericFormat
        value={amount}
        customInput={Input}
        onValueChange={(values) => {
          const { formattedValue, value, floatValue } = values;
          setAmount(floatValue);
        }}
        placeholder="100,000"
        thousandSeparator=","
        allowNegative={false}
      />
      <Typography marginTop={"20px"}>Hình thức</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant="standard"
        value={bankCode}
        label="Cách thanh toán"
        onChange={(e) => setBankCode(e.target.value)}
      >
        {/* <MenuItem value={""}>Cổng thanh toán VNPAYQR</MenuItem> */}
        <MenuItem value={"VNPAYQR"}>
          Thanh toán qua ứng dụng hỗ trợ VNPAYQR
        </MenuItem>
        <MenuItem value={"VNBANK"}>
          Thanh toán qua ATM-Tài khoản ngân hàng nội địa
        </MenuItem>
        <MenuItem value={"INTCARD"}>Thanh toán qua thẻ quốc tế</MenuItem>
      </Select>
      <Typography marginTop={"20px"}>Ngôn ngữ</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale}
        variant="standard"
        label="Ngôn ngữ"
        onChange={(e) => setLocale(e.target.value)}
      >
        <MenuItem value={"vn"}>Tiếng Việt</MenuItem>
        <MenuItem value={"en"}>Tiếng Anh</MenuItem>
      </Select>
      <Typography marginTop={"20px"}></Typography>
      <Button
        startIcon={<LocalAtmOutlinedIcon />}
        color="warning"
        variant="contained"
        onClick={() => {
          //  Payment.createPayment(locale, `${amount}`, bankCode)
          paymentService.createPaymentUrl(amount).then((data) => {
            window.open(data);
          });
        }}
      >
        <Typography variant="h5" fontWeight={"400"}>Thanh toán</Typography>
      </Button>
    </Box>
  );
};

export default Recharge;
