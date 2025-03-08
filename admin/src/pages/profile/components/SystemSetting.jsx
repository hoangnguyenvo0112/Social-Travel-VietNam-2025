import { useStore } from "@/stores";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import {
  Box,
  Button,
  Input,
  Slider,
  Stack,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { tokens } from "../../../theme/theme";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const SystemSetting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userStore } = useStore();
  const { user } = userStore;
  const [follow, setFollow] = useState(10000);
  const [cost, setCost] = useState(1000000);
  const [percent, setPercent] = useState(20);

  return (
    <Box padding={"20px"}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
          Thiết lập hệ thống (Doanh nghiệp)
        </Typography>
        <Button
          startIcon={<PublishedWithChangesOutlinedIcon />}
          color="error"
          variant="contained"
        >
          Lưu thay đổi
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"20px"}
      >
        <Typography>Số lượng follow tối thiểu để đăng ký</Typography>
        <NumericFormat
          value={follow}
          sx={{ width: 320 }}
          customInput={Input}
          onValueChange={(values) => {
            const { formattedValue, value, floatValue } = values;
            setFollow(floatValue);
          }}
          placeholder="Số lượng follow tối thiểu"
          thousandSeparator=","
          allowNegative={false}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"20px"}
      >
        <Typography>Tiền duy trì quảng cáo hàng tháng (VNĐ)</Typography>
        <NumericFormat
          sx={{ width: 320 }}
          value={cost}
          customInput={Input}
          onValueChange={(values) => {
            const { formattedValue, value, floatValue } = values;
            setCost(floatValue);
          }}
          placeholder="Tiền duy trì quảng cáo"
          thousandSeparator=","
          allowNegative={false}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"20px"}
      >
        <Typography>Chiết khấu dịch vụ (%)</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems={"center"}
          sx={{ width: 320 }}
        >
          <PrettoSlider
            value={percent}
            valueLabelDisplay="auto"
            onChange={(e) => setPercent(e.target.value)}
            aria-label="pretto slider"
          />
          <Input
            value={percent}
            size="small"
            onChange={(e) => setPercent(e.target.value)}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SystemSetting;
