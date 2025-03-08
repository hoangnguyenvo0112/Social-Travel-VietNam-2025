import { useTheme } from '@mui/material/styles';
import { useMediaQuery, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// add fakeNewData
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import listNew from '../../assets/json/fakeNewData.json';
// import { sendNotification } from "../../services/firebase";
import Avatar from "../Avatar";
import UserCard from "../UserCard";
import userStore from "@/stores/userStore";
import AddIcon from '@mui/icons-material/Add';
// import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop'
import ImageCrop from './crop';
import { toastError } from '@/utils/toast';

const NewsPro = () => {
  const [isShowNew, setIsShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBegin, setIsBegin] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [thumbNail, setThumbNail] = useState(null);
  const [news, setNews] = useState();
  const [count, setCount] = useState(0);
  let tempList = listNew;

  const handleClick = (item, index) => {
    setNews(item);
    setCount(index);
    setIsShowNew(true);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  // handle change video when back or forward
  const videoRef = useRef();

  const handleForward = () => {
    let newValue = tempList[count + 1];

    setNews(newValue);
    setCount(count + 1);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  const handleBack = () => {
    if (count == 0) return;
    let newValue = tempList[count - 1];
    setNews(newValue);
    setCount(count - 1);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  const handleAddNews = () => {
    setIsCreateNew(true);
  }

  const handleCreateNews = () => {
    setIsCreateNew(false);
    // value is img
    if (thumbNail !== null) {
      // Add img to new
    } else {
      toastError("Tạo thất bại");
    }
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          }
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
            <img src={userStore.user?.avatar} alt="Thumbnail" className="w-[120px] h-[200px] rounded-2xl mt-3 cursor-pointer blur-sm" />
            <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2">
              <div className='items-center'>
                <IconButton
                  type="button"
                  className="focus:outline-none"
                  sx={{
                    p: 1, backgroundColor: "#3b82f6", color: "#fff",
                    "&:hover": { backgroundColor: "green" }
                  }}
                  onClick={() => handleAddNews()}
                >
                  <AddIcon />
                </IconButton>
                <strong className='text-[14px] text-white'>Tạo tin</strong>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {listNew.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="w-[120px] h-[200px] rounded-2xl mt-3 relative">
                {item?.user && <div className="absolute top-[10px] left-[10px]">
                  <Avatar src={item?.user?.avatar} size="big-avatar" />
                </div>}
                <img onClick={() => handleClick(item, index)} src={item.thumb} alt="Thumbnail" className="w-[120px] h-[200px] rounded-2xl mt-3 cursor-pointer" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full z-[1]'>
        <div className={`focus:outline-none bg-yellow-500 rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80`} onClick={() => swiperRef.current?.slidePrev()}>
          <ArrowBackOutlinedIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </div>
        <div className='focus:outline-none bg-yellow-500 rounded-full p-2 cursor-pointer hover:opacity-100 opacity-80' onClick={() => swiperRef.current?.slideNext()}>
          <ArrowForwardOutlinedIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </div>
      </div>

      <Dialog fullScreen={fullScreen} open={isCreateNew} onClose={() => setIsCreateNew(false)}>
        <DialogTitle>
          <div>Tạo tin</div>
        </DialogTitle>
        <DialogContent>
          <ImageCrop setThumbNail={setThumbNail} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateNew(false)}>Đóng</Button>
          <Button onClick={() => handleCreateNews()}>Tạo</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullScreen={fullScreen} open={isShowNew} onClose={() => setIsShowNew(false)}>
        <DialogTitle>
          {news?.user ? <UserCard user={news?.user} /> : news?.title}
        </DialogTitle>
        <DialogContent>
          <div className="items-center flex justify-between">
            <span class={`material-icons cursor-pointer ${count === 0 && "invisible"}`} onClick={() => handleBack()}>arrow_back_ios</span>
            <div className="relative inline-block">
              <iframe
                width="270"
                height="480"
                ref={videoRef}
                frameborder="0"
                src={`${news?.sources}?autoplay=1`}>
                  
              </iframe>
              {!isLoading ??
                <div className='bg-slate-400 opacity-70 absolute top-0 w-[270px] h-[480px]'>
                  <div class="m-auto">
                    <div role="status">
                      <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
                }
            </div>
            <span class={`material-icons cursor-pointer ${count === tempList.length - 1 && "invisible"}`} onClick={() => handleForward()}>arrow_forward_ios</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsShowNew(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default NewsPro;
