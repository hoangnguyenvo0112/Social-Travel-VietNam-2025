import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import Carousel from "./carousel";
const QuiltedImageList = ({
  listImg,
  columns = 3,
  rowHeights = 160,
  id = null,
}) => {
  const [isShowImg, setIsShowImg] = useState(false);
  const srcset = (image, size, cols = 1, rows = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
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
                  onClick={() => setIsShowImg(true)}
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
                <ImageListItem
                  cols={1}
                  rows={1}
                  onClick={() => setIsShowImg(true)}
                  className="opacity-20"
                >
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
              onClick={() => setIsShowImg(true)}
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
              onClick={() => setIsShowImg(true)}
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
              onClick={() => setIsShowImg(true)}
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

      <Dialog fullScreen={fullScreen} open={isShowImg} onClose={() => setIsShowImg(false)}>
        <DialogTitle>Hình ảnh</DialogTitle>
        <DialogContent style={{ width: `${fullScreen ? "100%" : "600px"}` }}>
          <Carousel images={listImg} id={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsShowImg(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default QuiltedImageList;
