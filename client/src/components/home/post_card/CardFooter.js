import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { postService } from "@/services/postServices";
import { toast } from "@/utils/toast";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import { CLIENT_URL } from "../../../utils/config";
import LikeButton from "../../LikeButton";
import ShareModal from "../../ShareModal";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [audience, setAudience] = useState(post.audience||2);
  const [audienceCache, setAudienceCache] = useState(2);
  const [audiencePopup, setAudiencePopup] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  useEffect(()=>{
    setAudience(post.audience)
  },[post])
  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // handle save audience of post
  const handleSaveAudience = async () => {
    postService
      .updateAudience({
        postId: post._id,
        audience: audienceCache,
      })
      .then((data) => {
        toast("Cập nhật chế độ xem bài viết thành công");
      });
    console.log(audienceCache);
    // do some ting to save
    setAudience(audienceCache);
    setAudiencePopup(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved && auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div className="flex">
          <div className="flex items-center mr-1">
            <LikeButton
              isPost={true}
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
            <h6
              style={{
                marginLeft: "-4px",
                cursor: "pointer",
                color: "#db3545",
              }}
            >
              {post.likes.length} Thích
            </h6>
          </div>

          <div className="flex items-center">
            <Link to={`/post/${post._id}`} className="text-dark">
              <i className="far fa-comment" style={{ color: "#3b82f6" }} />
            </Link>

            <h6
              style={{
                marginLeft: "-4px",
                cursor: "pointer",
                color: "#3b82f6",
              }}
            >
              {post.comments.length} Bình luận
            </h6>
          </div>
        </div>

        <div className="flex items-center">
          <i
            class={isShare ? "fa fa-paper-plane" : "far fa-paper-plane"}
            onClick={() => setIsShare(!isShare)}
          ></i>
          {saved ? (
            <i
              className="fas fa-bookmark text-info"
              onClick={handleUnSavePost}
            />
          ) : (
            <i className="far fa-bookmark" onClick={handleSavePost} />
          )}
          {audience === 2 && auth.user._id === post.user._id && (
            <Tooltip title="Công khai" arrow placement="bottom">
              <IconButton
                type="button"
                className="focus:outline-none"
                sx={{ p: 1 }}
                onClick={() => setAudiencePopup(true)}
              >
                <PublicIcon sx={{ fontSize: "24px", color: "#22c55e" }} />
              </IconButton>
            </Tooltip>
          )}
          {audience === 1 && auth.user._id === post.user._id && (
            <Tooltip title="Bạn bè" arrow placement="bottom">
              <IconButton
                type="button"
                className="focus:outline-none"
                sx={{ p: 1 }}
                onClick={() => setAudiencePopup(true)}
              >
                <GroupIcon sx={{ fontSize: "24px", color: "#2874A6" }} />
              </IconButton>
            </Tooltip>
          )}
          {audience === 0 && auth.user._id === post.user._id && (
            <Tooltip title="Chỉ mình tôi" arrow placement="bottom">
              <IconButton
                type="button"
                className="focus:outline-none"
                sx={{ p: 1 }}
                onClick={() => setAudiencePopup(true)}
              >
                <LockIcon sx={{ fontSize: "24px", color: "#CB4335" }} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      {isShare && (
        <ShareModal url={`${CLIENT_URL}/post/${post._id}`} theme={theme} />
      )}
      {auth.user._id === post.user._id && (
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
      )}
    </div>
  );
};

export default CardFooter;
