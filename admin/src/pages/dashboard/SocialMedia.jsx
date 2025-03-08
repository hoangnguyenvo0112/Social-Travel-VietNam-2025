import { analystService } from "@/services/analyst.services";
import { CLIENT_URL } from "@/utils/constant";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  ActiveAvatar,
  HashTag,
  QuiltedImageList,
  SocialCard,
  TopGroup,
  TopStories,
  TopUser,
} from "../../components/DashItem";
import { tokens } from "../../theme/theme";
const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState({
    totalClient: null,
    totalCompany: null,
    totalGroup: null,
    totalPayment: null,
  });
  const [populatePost, setPopulatePost] = useState([]);
  const [populateGroup, setPopulateGroup] = useState([]);
  const [populateUser, setPopulateUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    analystService.getSocialMedia().then((data) => {
      setSocialMedia(data);
    });
  }, []);

  useEffect(() => {
    analystService.getPopulatePost().then((data) => {
      setPopulatePost(data);
    });
    analystService.getPopulateGroup().then((data) => {
      setPopulateGroup(data);
    });
    analystService.getPopulateUser().then((data) => {
      setPopulateUser(data);
    });
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const socialRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => socialRef.current,
  });

  return (
    <Box m="20px" ref={socialRef}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Bảng điều khiển - Truyền thông xã hội</h2>
        <Box marginBottom={"20px"}>
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
          <SocialCard
            title="Lượt thanh toán"
            content={socialMedia.totalPayment}
            desc="Số lượng truy cập trang thanh toán"
            color={colors.greenAccent[500]}
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
          <SocialCard
            title="SỐ HỘI NHÓM"
            content={socialMedia.totalGroup}
            desc="Số lượng các nhóm hiện tại của trang"
            color={colors.blueAccent[500]}
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
          <SocialCard
            title="LƯỢNG NGƯỜI DÙNG"
            content={socialMedia.totalClient}
            desc="Số lượng người dùng hiện tại"
            color={colors.redAccent[500]}
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
          <SocialCard
            title="LƯỢNG DOANH NGHIỆP"
            content={socialMedia.totalCompany}
            desc="Số lượng doanh nghiệp hợp tác"
            color={"#a333f4"}
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
          }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.custom[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top bài đăng nổi bật
            </Typography>
          </Box>
          {populatePost.map((story, i) => (
            <TopStories
              key={i}
              title={story.content}
              totalLike={story.likeCount}
              totalShare={0}
              totalComment={story.commentCount}
              img={story?.user?.avatar}
            />
          ))}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
          }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.custom[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top các trang fanpage
            </Typography>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Typography
                color={colors.grey[100]}
                variant="h7"
                fontWeight="600"
              >
                Bài đăng/tuần
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="h7"
                fontWeight="600"
              >
                Thành viên
              </Typography>
            </Stack>
          </Box>
          {populateGroup &&
            populateGroup.map((group, i) => (
              <TopGroup
                key={i}
                name={group.name}
                details={group.desc}
                numberPost={group.postCount}
                numberFollow={group.membersCount}
                icon={group.avatar}
              />
            ))}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
          }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.custom[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top người nổi tiếng
            </Typography>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Typography
                color={colors.grey[100]}
                variant="h7"
                fontWeight="600"
              >
                Bài đăng/tháng
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="h7"
                fontWeight="600"
              >
                Theo dõi
              </Typography>
            </Stack>
          </Box>
          {populateUser.map((user, i) => (
            <TopUser
              key={i}
              name={user.username}
              desc={user.email}
              totalPost={user.postCount}
              totalFollow={user.followersCount}
              img={user.avatar}
            />
          ))}
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
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
            Người dùng nổi bật
          </Typography>
          <Box
            mt="20px"
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <ActiveAvatar
              avatar={populateUser.length > 0 && populateUser[0]?.avatar}
              name={"Alooo"}
            />
            <Typography variant="h4" fontWeight={"700"} marginTop={"15px"}>
              {populateUser.length > 0 && populateUser[0].username}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"400"}
              marginTop={"2px"}
              color={colors.grey[400]}
            >
              {populateUser.length > 0 && populateUser[0].email}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginTop={"10px"}
            spacing={1}
          >
            <HashTag content={"Traveler"} kindOfColor={0} />
            <HashTag content={"Truyền cảm hứng"} kindOfColor={1} />
            <HashTag content={"Top follow"} kindOfColor={2} />
          </Stack>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={() => {
                if (populateUser && populateUser[0]._id) {
                  window.open(
                    `${CLIENT_URL}/profile/${populateUser[0]._id}`,
                    "_blank"
                  );
                }
              }}
              variant="outlined"
              color="info"
              sx={{ fontSize: "16px" }}
            >
              Truy cập
            </Button>
          </div>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.custom[100]}
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "dark" ? undefined : 1,
            borderRadius: (theme) =>
              theme.palette.mode === "dark" ? undefined : "5px",
          }}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Bài đăng nổi bật
          </Typography>
          <Box
            height="340px"
            width="100%"
            justifyContent="center"
            overflow="auto"
          >
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={1}
              marginBottom={"10px"}
            >
              <img
                alt="profile-user"
                width="40px"
                height="40px"
                src={populatePost[0]?.user.avatar}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <Typography variant="h6" fontWeight={"800"}>
                {populatePost[0]?.user?.username}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              fontWeight="400"
              sx={{ whiteSpace: "pre-line", marginBottom: "10px" }}
            >
              {populatePost[0]?.content}
            </Typography>
            {populatePost[0]?.images?.length > 0 && (
              <QuiltedImageList listImg={populatePost[0]?.images} />
            )}
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            marginTop={"15px"}
            alignItems={"center"}
          >
            <Box display="flex" alignItems="center">
              <ThumbUpOutlinedIcon fontSize="small" />
              <Typography marginLeft={"5px"} variant="h6" fontWeight="400">
                {populatePost[0]?.likeCount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <Typography marginLeft={"5px"} variant="h6" fontWeight="400">
                {populatePost[0]?.commentCount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IosShareOutlinedIcon fontSize="small" />
              <Typography marginLeft={"5px"} variant="h6" fontWeight="400">
                {0}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;
