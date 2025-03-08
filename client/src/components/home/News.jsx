import { useTheme } from "@mui/material/styles";
import { useMediaQuery, IconButton } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// add fakeNewData
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
// import listNew from '../../assets/json/fakeNewData.json';
// import { sendNotification } from "../../services/firebase";
import Avatar from "../Avatar";
import UserCard from "../UserCard";
import userStore from "@/stores/userStore";
import AddIcon from "@mui/icons-material/Add";
import { toastError } from "@/utils/toast";
import CreateNew from "./crop";
import { postService } from "@/services/postServices";
import { observer } from "mobx-react";

const News = () => {
  const [isShowNew, setIsShowNew] = useState(false);
  const [isOnPlay, setIsOnPlay] = useState(false);
  const [isBegin, setIsBegin] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [updateNew, setUpdateNew] = useState(null);
  const [newItem, setNewItem] = useState();
  const [count, setCount] = useState(0);
  const [listNews, setListNews] = useState([]);
  let tempList = listNews;

  useEffect(() => {
    postService.myStory().then((data) => {
      setListNews(data);
    });
  }, [updateNew]);

  const handleClick = (item, index) => {
    setNewItem(item);
    setCount(index);
    setIsShowNew(true);
    setIsOnPlay(false);
  };

  // handle change video when back or forward
  const videoRef = useRef();

  const handleForward = () => {
    let newValue = tempList[count + 1];
    if (!newValue?.videoUrl) {
      return;
    }
    setNewItem(newValue);
    setCount(count + 1);
    setIsOnPlay(false);
    videoRef.current.src = newValue.videoUrl;
    videoRef.current.load();
    videoRef.current.play();
  };

  const handleBack = () => {
    if (count == 0) return;
    let newValue = tempList[count - 1];
    setNewItem(newValue);
    setCount(count - 1);
    setIsOnPlay(false);
    videoRef.current.src = newValue?.videoUrl;
    videoRef.current.load();
    videoRef.current.play();
  };

  const handleAddNews = () => {
    setIsCreateNew(true);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const swiperRef = useRef();

  return (
    <div className="mt-3 relative">
      {/* <button onClick={() => sendNotification("hh", "TEst", "Content")}>Send</button> */}
      <Swiper
        breakpoints={{
          // when window width is >= 200px
          200: {
            slidesPerView: 3,
          },
          500: {
            slidesPerView: 4,
          },
          660: {
            slidesPerView: 5,
          },
          780: {
            slidesPerView: 4,
          },
          980: {
            slidesPerView: 5,
          },
          // when window width is >= 1000px
          1170: {
            slidesPerView: 6,
          },
          1360: {
            slidesPerView: 5,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onReachBeginning={() => setIsBegin(true)}
        mousewheel={true}
        modules={[Navigation, Mousewheel]}
      >
        {/* Tạo tin */}
        <SwiperSlide>
          <div className="w-[120px] h-[200px] rounded-2xl mt-3 relative">
            <img
              src={userStore.user?.avatar}
              alt="Thumbnail"
              className="w-[120px] h-[200px] rounded-2xl mt-3 cursor-pointer "
            />
            <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2">
              <div className="items-center">
                <IconButton
                  type="button"
                  className="focus:outline-none"
                  sx={{
                    p: 1,
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    "&:hover": { backgroundColor: "green" },
                  }}
                  onClick={() => handleAddNews()}
                >
                  <AddIcon />
                </IconButton>
                <strong className="text-[14px] text-white">Tạo tin</strong>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {listNews.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="w-[120px] h-[200px] rounded-2xl mt-3 relative">
                {item?.user && (
                  <div className="absolute top-[10px] left-[10px]">
                    <Avatar src={item?.user?.avatar} size="big-avatar" />
                  </div>
                )}
                <img
                  onClick={() => handleClick(item, index)}
                  src={item.thumbnail}
                  alt="Thumbnail"
                  className="w-[120px] h-[200px] rounded-2xl mt-3 cursor-pointer"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full z-[1]">
        <div
          className={`focus:outline-none bg-yellow-500 rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80`}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </div>
        <div
          className="focus:outline-none bg-yellow-500 rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowForwardOutlinedIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </div>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={isCreateNew}
        onClose={() => setIsCreateNew(false)}
      >
        <DialogTitle>
          <div>Tạo tin</div>
        </DialogTitle>
        <DialogContent style={{ width: `${fullScreen ? "100%" : "600px"}` }}>
          <CreateNew setIsCreateNew={setIsCreateNew} setUpdateNew={setUpdateNew} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog
        sx={{
          ".MuiModal-backdrop": {
            backgroundColor: "black",
          },
        }}
        fullScreen={fullScreen}
        open={isShowNew}
        onClose={() => setIsShowNew(false)}
      >
        <DialogTitle className="absolute -top-4 left-10 z-10 ">
          {newItem?.user ? (
            <UserCard classNameTitle={"color-White text-[14px]"} user={newItem?.user} />
          ) : (
            newItem?.title
          )}
        </DialogTitle>
        <DialogTitle className="absolute -top-4 -left-6">
          <div
            onClick={() => setIsShowNew(false)}
            className="top-4  cursor-pointer"
          >
            <ClearOutlinedIcon
              style={{ color: "#fff", width: "44x" }}
              color={"#fff"}
            />
          </div>
        </DialogTitle>

        <div
          className=" items-center flex justify-between"
          style={{ background: "black" }}
        >
          <div
            style={{ background: "#F5F6F7" }}
            className={`${
              count === 0 && "invisible"
            } w-12 h-12 flex items-center justify-center focus:outline-none rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80`}
          >
            <span
              class={`ml-2 material-icons cursor-pointer `}
              onClick={() => handleBack()}
            >
              arrow_back_ios
            </span>
          </div>

          <div className="relative inline-block h-full mx-2 ">
            <video
             autoPlay={true}
              onPlay={() => setIsOnPlay(true)}
              ref={videoRef}
              controls
              onEnded={handleForward}
              className="h-[84vh] aspect-[9/16] rounded-xl shadow-lg"
            >
              <source src={newItem?.videoUrl} />
            </video>
            {/* {!isOnPlay && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                <img
                  src={newItem?.thumbnail}
                  alt="Thumbnail"
                  className="w-full max-h-full"
                />
              </div>
            )} */}
          </div>
          <div
            style={{ background: "#F5F6F7" }}
            className={`w-12 h-12 flex items-center justify-center focus:outline-none rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80 ${
              count === tempList.length - 1 && "invisible"
            }`}
          >
            <span
              class={`material-icons cursor-pointer `}
              onClick={() => handleForward()}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default observer(News);
