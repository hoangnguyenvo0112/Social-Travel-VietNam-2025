import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { POST_TYPES, getPosts } from "@/redux/actions/postAction";
import { updatePost } from "@/redux/actions/postAction";
import { postService } from "@/services/postServices";
import { useStoreMobx } from "@/stores";
import { imageUpload } from "@/utils/imageUpload";
import { imageShow, videoShow } from "@/utils/mediaShow";
import { toast } from "@/utils/toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  IconButton,
  DialogTitle,
  ListItemText,
  Tooltip,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import CheckIn from "./CheckIn";
import Feeling from "./Feeling";
import Icons from "./Icons";
import Map from "./Map";
import TagUser from "./TagUser";
const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const [group, setGroup] = useState();
  const { notificationStore } = useStoreMobx();
  const [indexSelected, setIndexSelected] = useState(-1);
  useEffect(() => {
    const url = window.location.href;
    if (url.includes("group")) {
      setGroup(url.split("/").pop());
    }
  }, []);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [feeling, setFeeling] = useState();
  const [isOpenTaggedUser, setIsOpenTaggedUser] = useState(false);
  const [location, setLocation] = useState("");
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);

  const [listTagUser, setListTagUser] = useState([]);
  const [images, setImages] = useState([]);

  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");
  const [audience, setAudience] = useState(2);
  const [audienceCache, setAudienceCache] = useState(2);
  const [audiencePopup, setAudiencePopup] = useState(false);

  const handleChangeImages = (e) => {
    setIsOpenCheckIn(false)
    setIsOpenTaggedUser(false)
    setIsOpenMap(false)
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 10) {
        return (err = "Tệp image/video lớn hơn 10mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleCloseTagUser = () => {
    setIsOpenTaggedUser(false);
  };

  const handleSaveAudience = () => {
    setAudience(audienceCache);
    setAudiencePopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast("Vui lòng chọn ảnh từ thư viện");
      return;
    }

    if (status.onEdit) {
      dispatch(
        updatePost({
          content,
          images,
          auth,
          status,
          group,
          feeling,
          location,
          audience,
          listTagUser: listTagUser.map((item) => item._id),
        })
      );
    } else {
      let media = [];
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (images.length > 0) {
        media = await imageUpload(images);
      }
      postService
        .createPost({
          content,
          images: media,
          group,
          feeling,
          location,
          audience,
          listTagUser: listTagUser.map((item) => item._id),
        })
        .then((data) => {
          dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
          dispatch(getPosts(auth.token));

          // dispatch({
          //   type: POST_TYPES.CREATE_POST,
          //   payload: { ...data.newPost },
          // });
          if (listTagUser.length > 0) {
            const msg = {
              id: data.newPost._id,
              text: "đã gắn thẻ bạn trong 1 bài viết",
              recipients: listTagUser.map((item) => item._id),
              url: `/post/${data.newPost._id}`,
              content,
              image: media[0].url,
            };
            notificationStore.pushNotification(msg);
          }
        });
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });

    // window.location.reload();
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const handleClickOnMap = useCallback(
    (data) => {
      console.log(data);
      setLocation({ ...location, address: data });
    },
    [location]
  );
  return (
    <div className="status_modal flex flex-col items-center justify-center prevent-select">
      <form className="border bg-White" onSubmit={handleSubmit}>
        <div className="status_header">
          <div className="items-center overflow-hidden text-ellipsis  max-w-[85%]">
            {!listTagUser.length && !feeling && !location ? (
              <p className="m-0 text-lg inline-flex">Tạo bài viết</p>
            ) : (
              <>
                <p className="m-0 text-lg text-blue-500 inline-flex">
                  {auth.user.username}
                </p>
                {feeling ? (
                  <p className="m-0 text-sm inline-flex">&nbsp;{feeling}</p>
                ) : undefined}
                {listTagUser.length > 0 && (
                  <p className="m-0 text-sm inline-flex">
                    &nbsp;cùng với&nbsp;
                  </p>
                )}

                {listTagUser.map((user, item) => (
                  <p
                    key={item}
                    className="m-0 text-lg text-blue-500 inline-flex"
                  >
                    {user.username},&nbsp;
                  </p>
                ))}

                {location && <p>tại {location.address}</p>}
              </>
            )}
          </div>
          {isOpenTaggedUser ? (
            <span
              className="text-blue-500 flex items-center hover:scale-125"
              onClick={() => handleCloseTagUser()}
            >
              <i style={{ fontSize: "20px" }} class="fa fa-arrow-left mr-1"></i>
              <p style={{ fontSize: "14px" }} className="">
                Trở về
              </p>
            </span>
          ) : (
            <span
              className="text-danger cursor-pointer z-50"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.STATUS,
                  payload: false,
                })
              }
            >
              &times;
            </span>
          )}
        </div>

        <div className="status_body">
          {isOpenTaggedUser ? (
            <TagUser
              listTagUser={listTagUser}
              onChange={(data) => {
                setListTagUser(data);
              }}
            />
          ) : (
            <>
              {isOpenCheckIn ? (
                <CheckIn
                  onClick={(data) => {
                    console.log(data);
                    setLocation(data);
                    setIsOpenCheckIn(false);
                    setIsOpenMap(true)
                  }}
                />
              ):location&& isOpenMap? <Map onClick={handleClickOnMap} location={location} /> : (
                <>
                  <textarea
                    name="content"
                    value={content}
                    placeholder={`${auth.user.username}, bạn đang nghĩ gì?`}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  <div className="show_images">
                    {images.map((img, index) => (
                      <div key={index} id="file_img">
                        {img.camera ? (
                          imageShow(img.camera, theme)
                        ) : img.url ? (
                          <>
                            {img.url.match(/video/i)
                              ? videoShow(img.url, theme)
                              : imageShow(img.url, theme)}
                          </>
                        ) : (
                          <>
                            {img.type.match(/video/i)
                              ? videoShow(URL.createObjectURL(img), theme)
                              : imageShow(URL.createObjectURL(img), theme)}
                          </>
                        )}
                        <span onClick={() => deleteImages(index)}>&times;</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          {/* {location && isOpenMap ? (
            <Map onClick={handleClickOnMap} location={location} />
          ) : undefined} */}

          {/* Bottom content */}
          <div className="flex justify-between">
            <div />
            <Icons
              className="-ml-5"
              setContent={setContent}
              content={content}
              theme={theme}
              isInCreatePost={true}
            />
          </div>
          <div className="input_images flex justify-center items-center border-[1px] border-[#ddd] rounded-sm prevent-select">
            {!stream && <p className="mr-8">Thêm vào bài viết</p>}
            {stream ? (
              <i
                className="fas fa-camera text-orange-500"
                onClick={handleCapture}
              />
            ) : (
              <>
                <i
                  className="fas fa-camera text-orange-500 hover:scale-125"
                  onClick={handleStream}
                />
                <div className="file_upload hover:scale-125">
                  <i className="fas fa-image mt-1 ml-2 text-green-500" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={handleChangeImages}
                  />
                </div>
                <i
                  style={{ fontSize: "24px" }}
                  className="fas fa-user-tag text-blue-500 hover:scale-125"
                  onClick={() => {
                    setIsOpenTaggedUser(!isOpenTaggedUser);
                    setIsOpenCheckIn(false);
                    setIsOpenMap(false)
                  }}
                ></i>
                <i
                  class="fa fa-map-marker-alt ml-1 text-red-500 hover:scale-125"
                  onClick={() => {
                    setIsOpenCheckIn(!isOpenCheckIn);
                    setIsOpenTaggedUser(false);
                    setIsOpenMap(false)
                  }}
                ></i>
                <Feeling
                  onClick={() => {

                    setIsOpenCheckIn(false);
                    setIsOpenTaggedUser(false);
                  }}
                  className="-ml-5"
                  setFeeling={setFeeling}
                  feeling={feeling}
                  theme={theme}
                  isInCreatePost={true}
                />
                {audience === 2 && (
                  <Tooltip title="Công khai" arrow placement="bottom">
                    <IconButton
                      type="button"
                      className="focus:outline-none"
                      sx={{ p: "2px" }}
                      onClick={() => setAudiencePopup(true)}
                    >
                      <PublicIcon sx={{ fontSize: "32px", color: "#22c55e" }} />
                    </IconButton>
                  </Tooltip>
                )}
                {audience === 1 && (
                  <Tooltip title="Bạn bè" arrow placement="bottom">
                    <IconButton
                      type="button"
                      className="focus:outline-none"
                      sx={{ p: "2px" }}
                      onClick={() => setAudiencePopup(true)}
                    >
                      <GroupIcon sx={{ fontSize: "32px", color: "#2874A6" }} />
                    </IconButton>
                  </Tooltip>
                )}
                {audience === 0 && (
                  <Tooltip title="Chỉ mình tôi" arrow placement="bottom">
                    <IconButton
                      type="button"
                      className="focus:outline-none"
                      sx={{ p: "2px" }}
                      onClick={() => setAudiencePopup(true)}
                    >
                      <LockIcon sx={{ fontSize: "32px", color: "#CB4335" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        </div>

        <div className="status_footer">
          <button className="btn btn-secondary w-100 text-[#000]" type="submit">
            Đăng
          </button>
        </div>
      </form>
      <Dialog onClose={() => setAudiencePopup(false)} open={audiencePopup}>
        <DialogTitle>Chế độ bài đăng</DialogTitle>
        <List sx={{ pt: 0 }}>
          {/* PUBLIC */}
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setAudienceCache(2)}
              selected={audienceCache === 2}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#EBEDEF", color: "#22c55e" }}>
                  <PublicIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Chế độ công khai"} />
            </ListItemButton>
          </ListItem>
          {/* FRIEND */}
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setAudienceCache(1)}
              selected={audienceCache === 1}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#EBEDEF", color: "#2874A6" }}>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Bạn bè xem bài đăng"} />
            </ListItemButton>
          </ListItem>
          {/* ONLY ME */}
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setAudienceCache(0)}
              selected={audienceCache === 0}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#EBEDEF", color: "#CB4335" }}>
                  <LockIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Chỉ mình bạn xem bài đăng"} />
            </ListItemButton>
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={() => setAudiencePopup(false)}>Hủy</Button>
          <Button onClick={() => handleSaveAudience()}>Hoàn tất</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusModal;
