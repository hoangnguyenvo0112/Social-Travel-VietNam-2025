import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";

export const ProfileCard = ({
  title = "Tài khoản hiện tại",
  number = "1,000,000 VNĐ",
  icon = <AttachMoneyIcon fontSize="medium" />,
  numberOfStyle = 0,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const gradientColor = [
    {
      topLeftColor: "#f6269c",
      rightBottomColor: "#9c35fd",
    },
    {
      topLeftColor: "#17cbfe",
      rightBottomColor: "#1f5ff6",
    },
    {
      topLeftColor: "#fbc533",
      rightBottomColor: "#f54539",
    },
    {
      topLeftColor: "#fe7eab",
      rightBottomColor: "#fb4a82",
    },
  ];

  return (
    <Box
      sx={{
        width: "240px",
        padding: "10px",
        borderRadius: "5px",
        background: `linear-gradient(to right bottom, ${gradientColor[numberOfStyle].topLeftColor}, ${gradientColor[numberOfStyle].rightBottomColor})`,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        spacing={2}
      >
        <Box
          padding={"5px"}
          sx={{
            lineHeight: 0,
          }}
          borderRadius={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"#000"}
          backgroundColor={"#fff"}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" color="#fff">
            {title}
          </Typography>
        </Box>
      </Stack>
      <Typography
        textAlign={"center"}
        variant="h4"
        marginTop={"10px"}
        fontWeight={"bold"}
        color="#fff"
      >
        {number}
      </Typography>
    </Box>
  );
};
