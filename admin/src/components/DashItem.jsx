import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  Avatar,
  Badge,
  Box,
  ImageList,
  ImageListItem,
  LinearProgress,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Follower1Icon from "../assets/image/follower1.png";
import { tokens } from "../theme/theme";

export const RowOfGroup = ({ name, details, numberPost, percent, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dataRandom = [
    colors.redAccent[600],
    colors.blueAccent[600],
    colors.greenAccent[600],
  ];

  const [colorRandom, setColorRandom] = useState(null);

  const compDisplay = () => {
    const randomDisplay = Math.floor(Math.random() * dataRandom.length);
    setColorRandom(dataRandom[randomDisplay]);
  };

  useEffect(() => {
    compDisplay();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${colors.grey[900]}`}
      padding={"10px"}
      sx={{
        cursor: "default",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Avatar sx={{ bgcolor: colorRandom }}>{icon}</Avatar>
        <Box paddingLeft={"10px"}>
          <Typography variant="h6" fontWeight="600" marginBottom={"-8px"}>
            {name}
          </Typography>
          <Typography variant="h7">{details}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="600" marginRight={"15px"}>
          {numberPost}
        </Typography>

        <Box
          color={percent < 0 ? colors.redAccent[400] : colors.greenAccent[400]}
          alignItems="center"
          display="flex"
        >
          {percent < 0 ? (
            <ArrowDownwardOutlinedIcon fontSize="16px" />
          ) : (
            <ArrowUpwardOutlinedIcon fontSize="16px" />
          )}
          <Typography variant="h6" fontWeight="600">
            {percent}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const TopGroup = ({ name, details, numberFollow, numberPost, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dataRandom = [
    colors.redAccent[600],
    colors.blueAccent[600],
    colors.greenAccent[600],
  ];

  const [colorRandom, setColorRandom] = useState(null);

  const compDisplay = () => {
    const randomDisplay = Math.floor(Math.random() * dataRandom.length);
    setColorRandom(dataRandom[randomDisplay]);
  };

  useEffect(() => {
    compDisplay();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${colors.grey[900]}`}
      padding={"10px"}
      sx={{
        "&:hover": {
          opacity: [0, 0.8, 0.7],
        },
        cursor: "pointer",
      }}
      onClick={() => {}}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Avatar src={icon} sx={{ bgcolor: colorRandom }}>
          {icon}
        </Avatar>
        <Box paddingLeft={"10px"}>
          <Typography variant="h6" fontWeight="600" marginBottom={"-8px"}>
            {name}
          </Typography>
          <Box
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            maxWidth={"150px"}
          >
            <Typography
              variant="h7"
            >
              {details}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          color={colors.blueAccent[400]}
          alignItems="center"
          display="flex"
          marginRight={"15px"}
        >
          <CloudUploadOutlinedIcon fontSize="16px" />
          <Typography variant="h6" fontWeight="600" marginLeft={"5px"}>
            {numberPost}
          </Typography>
        </Box>
        <Box color={colors.greenAccent[400]} alignItems="center" display="flex">
          <img
            alt="followers-icon"
            width="20px"
            height="20px"
            src={Follower1Icon}
          />
          <Typography variant="h6" fontWeight="600" marginLeft={"5px"}>
            {numberFollow}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const TopUser = ({ name, desc, totalFollow, totalPost, img }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataRandom = [
    colors.redAccent[600],
    colors.blueAccent[600],
    colors.greenAccent[600],
  ];

  const [colorRandom, setColorRandom] = useState(null);

  const compDisplay = () => {
    const randomDisplay = Math.floor(Math.random() * dataRandom.length);
    setColorRandom(dataRandom[randomDisplay]);
  };

  useEffect(() => {
    compDisplay();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${colors.grey[900]}`}
      padding={"10px"}
      sx={{
        "&:hover": {
          opacity: [0, 0.8, 0.7],
        },
        cursor: "pointer",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Avatar sx={{ bgcolor: colorRandom }} alt={name} src={img} />
        <Box paddingLeft={"10px"}>
          <Typography variant="h6" fontWeight="600" marginBottom={"-8px"}>
            {name}
          </Typography>
          <Typography variant="h7">{desc}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          color={colors.greenAccent[400]}
          alignItems="center"
          display="flex"
          marginRight={"15px"}
        >
          <CloudUploadOutlinedIcon fontSize="16px" />
          <Typography variant="h6" fontWeight="600" marginLeft={"5px"}>
            {totalPost}
          </Typography>
        </Box>
        <Box color={colors.redAccent[400]} alignItems="center" display="flex">
          <GroupAddOutlinedIcon fontSize="16px" />
          <Typography variant="h6" fontWeight="600" marginLeft={"5px"}>
            {totalFollow}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const TopStories = ({
  title,
  totalLike,
  totalShare,
  totalComment,
  img,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dataRandom = [
    colors.redAccent[600],
    colors.blueAccent[600],
    colors.greenAccent[600],
  ];

  const [colorRandom, setColorRandom] = useState(null);

  const compDisplay = () => {
    const randomDisplay = Math.floor(Math.random() * dataRandom.length);
    setColorRandom(dataRandom[randomDisplay]);
  };

  useEffect(() => {
    compDisplay();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${colors.grey[900]}`}
      padding={"10px"}
      sx={{
        "&:hover": {
          opacity: [0, 0.8, 0.7],
        },
        cursor: "pointer",
      }}
    >
      <Box display="flex" alignItems="flex-start" width={"100%"}>
        <Avatar sx={{ bgcolor: colorRandom }} alt={title} src={img} />
        <Box paddingLeft={"10px"} width={"100%"}>
          <Typography variant="h6" fontWeight="600" marginBottom={"-8px"}>
            {title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop={"18px"}
            maxWidth={"160px"}
          >
            <Box display="flex" alignItems="center">
              <ThumbUpOutlinedIcon fontSize="8px" />
              <Typography marginLeft={"5px"} variant="h8" fontWeight="400">
                {totalLike}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ChatBubbleOutlineOutlinedIcon fontSize="8px" />
              <Typography marginLeft={"5px"} variant="h8" fontWeight="400">
                {totalComment}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IosShareOutlinedIcon fontSize="8px" />
              <Typography marginLeft={"5px"} variant="h8" fontWeight="400">
                {totalShare}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ChartDetail = ({ main, details, percent }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      marginLeft="20px"
      paddingRight="20px"
      borderRight={`2px solid ${colors.grey[900]}`}
    >
      <Box alignItems="center" display="flex">
        <Typography variant="h3" fontWeight="bold">
          {main}
        </Typography>
        <Box
          color={percent < 0 ? colors.redAccent[400] : colors.greenAccent[400]}
          alignItems="center"
          display="flex"
        >
          {percent < 0 ? (
            <ArrowDownwardOutlinedIcon fontSize="16px" />
          ) : (
            <ArrowUpwardOutlinedIcon fontSize="16px" />
          )}
          <Typography variant="h6" fontWeight="600">
            {percent}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="h7" fontWeight="200">
        {details}
      </Typography>
    </Box>
  );
};

export const BarDetail = ({ title, content, desc, progress }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box flex={1} padding={"10px"}>
      <Typography variant="h5" fontWeight="200">
        {title}
      </Typography>
      <Typography variant="h3" fontWeight="500">
        {content}
      </Typography>
      <LinearProgress color="success" variant="buffer" value={progress} />
      <Typography variant="h7" fontWeight="200" color={colors.grey[300]}>
        {desc}
      </Typography>
    </Box>
  );
};

export const CardDetail = ({ title, content, percent, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography variant="h5" fontWeight="600">
        {title}
      </Typography>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        marginTop={"15px"}
      >
        <Box>
          <Typography variant="h3" fontWeight="600">
            {content}
          </Typography>
          <Box
            color={
              percent < 0 ? colors.redAccent[400] : colors.greenAccent[400]
            }
            alignItems="center"
            display="flex"
          >
            {percent < 0 ? (
              <ArrowDownwardOutlinedIcon fontSize="16px" />
            ) : (
              <ArrowUpwardOutlinedIcon fontSize="16px" />
            )}
            <Typography variant="h6" fontWeight="600">
              {percent}%
            </Typography>
          </Box>
        </Box>
        <Box color={color}>
          <LeaderboardIcon fontSize="large" />
        </Box>
      </Box>
    </Box>
  );
};

export const SocialCard = ({ title, desc, content, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box padding={"15px"}>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h2" fontWeight={"700"}>
            {content}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={"800"}
            marginTop={"10px"}
            color={color}
          >
            {title}
          </Typography>
        </Box>
        <Box color={color}>
          <StackedBarChartIcon fontSize="large" color={color} />
        </Box>
      </Box>
      <Typography variant="h7" color={colors.grey[100]}>
        {desc}
      </Typography>
    </Box>
  );
};

export const ActiveAvatar = ({ avatar, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 0px`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
      width: "15px",
      height: "15px",
      borderRadius: "50%",
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      
    >
      <Avatar
        sx={{ width: 160, height: 160 }}
        alt={name ? name : "Avatar"}
        src={avatar}
      />
    </StyledBadge>
  );
};

export const HashTag = ({ content = "NDCDat", kindOfColor = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const hashTagColor = [
    {
      primaryColor: "#CB4335",
      secondaryColor: "#FDEDEC",
    },
    {
      primaryColor: "#EB984E",
      secondaryColor: "#FEF5E7",
    },
    {
      primaryColor: "#239B56",
      secondaryColor: "#EAFAF1",
    },
  ];
  return (
    <Box
      paddingLeft={"8px"}
      paddingRight={"8px"}
      backgroundColor={hashTagColor[kindOfColor].secondaryColor}
      border={`2px solid ${hashTagColor[kindOfColor].primaryColor}`}
      borderRadius={"16px"}
    >
      <Typography variant="h6" color={hashTagColor[kindOfColor].primaryColor}>
        {content}
      </Typography>
    </Box>
  );
};

export const QuiltedImageList = ({
  listImg,
  columns = 3,
  rowHeights = 120,
}) => {
  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };
  return (
    <ImageList
      sx={{ width: "100%" }}
      variant="quilted"
      cols={columns}
      rowHeight={rowHeights}
    >
      {
        // layout with more 4 images
        listImg.length > 4 && (
          <>
            {listImg.slice(0, 3).map((item, index) => (
              <ImageListItem
                className="cursor-pointer"
                key={index}
                cols={index == 0 ? 3 : 1}
                rows={index == 0 ? 2 : 1}
              >
                <img
                  {...srcset(
                    item.url,
                    rowHeights,
                    index == 0 ? 2 : 1,
                    index == 0 ? 3 : 1
                  )}
                  alt={item?.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            <div className="relative hover:opacity-60 cursor-pointer">
              <p className="absolute top-[64px] left-[80px] text-[32px]">
                + {listImg.length - 3}
              </p>
              <ImageListItem cols={1} rows={1} className="opacity-20">
                <img
                  {...srcset(listImg[3].url, rowHeights, 1, 1)}
                  alt={"viewMore"}
                  loading="lazy"
                />
              </ImageListItem>
            </div>
          </>
        )
      }
      {
        // layout with 4 images
        listImg.length == 4 &&
          listImg.map((item, index) => (
            <ImageListItem
              className="cursor-pointer"
              key={index}
              cols={index == 0 ? 3 : 1}
              rows={index == 0 ? 2 : 1}
            >
              <img
                {...srcset(
                  item.url,
                  rowHeights,
                  index == 0 ? 2 : 1,
                  index == 0 ? 3 : 1
                )}
                alt={item?.title}
                loading="lazy"
              />
            </ImageListItem>
          ))
      }
      {
        // layout with 3 images
        listImg.length == 3 &&
          listImg.map((item, index) => (
            <ImageListItem
              className="cursor-pointer"
              key={index}
              cols={index == 0 ? 2 : 1}
              rows={index == 0 ? 2 : 1}
            >
              <img
                {...srcset(
                  item.url,
                  rowHeights,
                  index == 0 ? 2 : 1,
                  index == 0 ? 2 : 1
                )}
                alt={item?.title}
                loading="lazy"
              />
            </ImageListItem>
          ))
      }
      {
        // layout with 2 images
        listImg.length == 2 &&
          listImg.map((item, index) => (
            <ImageListItem
              className="cursor-pointer"
              key={index}
              cols={3}
              rows={2}
            >
              <img
                {...srcset(item.url, rowHeights, 1, 1)}
                alt={item?.title}
                loading="lazy"
              />
            </ImageListItem>
          ))
      }
      {
        // layout with 1 images
        listImg.length == 1 &&
          listImg.map((item, index) => (
            <ImageListItem key={index} cols={3} rows={3}>
              <img
                {...srcset(item.url, rowHeights, 1, 1)}
                alt={item?.title}
                loading="lazy"
              />
            </ImageListItem>
          ))
      }
    </ImageList>
  );
};
