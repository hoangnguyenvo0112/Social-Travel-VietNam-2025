import { analystService } from "@/services/analyst.services";
import { formatMoneyVND } from "@/utils/string";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { mockGroupsUsageData } from "../../assets/data/mockData";
import { ChartDetail, RowOfGroup } from "../../components/DashItem";
import StatBox from "../../components/StatBox";
import HorizontalChart from "../../components/chart/HorizontalChart";
import LineChart from "../../components/chart/LineChart";
import { tokens } from "../../theme/theme";
import userStore from "@/stores/userStore";
import { ROLE_ID } from "@/utils/constant";
const Analytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dashboard, setDashboard] = useState({
    commentsNumberInWeek: 0,
    newGroupsInWeek: 0,
    newNumberUserInWeek: 0,
    postsNumberInWeek: 0,
    increasePosts: 0,
    increaseComments: 0,
    increaseNewUsers: 0,
    increaseNewsGroups: 0,
  });

  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    packages: [],
  });

  const [topComments, setTopComments] = useState({
    topMostCommentsInUsers:[],
    topMostCommentsInGroups:[]

  });
  useEffect(() => {
    analystService.getDashboard().then((data) => {
      setDashboard(data);
    });
  }, []);
  useEffect(() => {
    analystService.revenueByMonthForEachPackage().then((data) => {
      setRevenue(data);
      if (userStore.user.role.roleId === ROLE_ID.ADMIN && data.totalRevenue) {
        userStore.setTotalRevenue(data.totalRevenue);
      }
    });
  }, []);
  useEffect(() => {
    analystService.getTopMostComment().then((data) => {
      setTopComments(data);
    });
  }, []);
  const analystRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => analystRef.current,
  });

  const isPrint = useMediaQuery("print");

  return (
    <Box m="20px" ref={analystRef}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Bảng điều khiển - Phân tích</h2>
        <Box marginBottom={"20px"} className="hide-on-print">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => handlePrint()}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Tải xuống báo cáo
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.custom[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <StatBox
            title={dashboard?.postsNumberInWeek}
            subtitle="Số bài trong tuần"
            progress={`${dashboard?.increasePosts / 100}`}
            increase={`+${dashboard?.increasePosts}%`}
            icon={
              <CloudUploadIcon
                sx={{ color: colors.redAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.custom[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <StatBox
            title={dashboard.commentsNumberInWeek}
            subtitle="Số lượt bình luận trong tuần"
            progress={`${dashboard.increaseComments / 100}`}
            increase={`+${dashboard.increaseComments}%`}
            icon={
              <AddCommentIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.custom[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <StatBox
            title={dashboard.newNumberUserInWeek}
            subtitle="Số người dùng mới trong tuần"
            progress={`${dashboard.increaseNewUsers / 100}`}
            increase={`+${dashboard.increaseNewUsers}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.custom[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <StatBox
            title={dashboard.newGroupsInWeek}
            subtitle="Số hội nhóm mới trong tuần"
            progress={`${dashboard.increaseNewsGroups / 100}`}
            increase={`${dashboard.increaseNewsGroups}%`}
            icon={<AddHomeIcon sx={{ color: "#f79154", fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Biểu đồ doanh thu các gói
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {formatMoneyVND(revenue.totalRevenue)}
              </Typography>
            </Box>
          </Box>
          <Box height={"300px"}>
            <LineChart packages={revenue.packages} isDashboard={true} />
          </Box>
          {/* this is box detail */}
        </Box>

        {/* ROW 5 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Top hội nhóm tương tác nhiều trong tuần
          </Typography>
          <Box height="380px" mt="-20px">
            <HorizontalChart indexBy={'name'} keys={['commentCount']} data={topComments.topMostCommentsInGroups} isDashboard={true} isGroup={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Top người dùng tương tác nhiều trong tuần
          </Typography>
          <Box height="380px" mt="-20px">
            <HorizontalChart indexBy={'fullname'} keys={['commentCount']} data={topComments.topMostCommentsInUsers} isDashboard={true} isGroup={false} />
          </Box>
        </Box>
        {/* ROW 6 */}
      </Box>
    </Box>
  );
};

export default Analytics;
