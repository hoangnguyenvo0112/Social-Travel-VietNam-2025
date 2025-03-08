import React from "react";
import Avatar from "../../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { CLIENT_URL } from "../../../utils/config";
import VerifiedIcon from '@mui/icons-material/Verified';

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng?")) {
      dispatch(deletePost({ post, auth, socket }));
      return navigate("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${CLIENT_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />
        {/* Add validate tick */}
        <div style={{ paddingLeft: "10px" }} className="card_name">
        <div className="items-center overflow-hidden lg:max-w-[780px] max-w-[400px]">
            <Link to={`/profile/${post.user._id}`} className="inline-flex items-center">
              <h6 className="m-0 mr-1">{post.user.username}</h6>
              {/* Validate tick */}
              <VerifiedIcon sx={{ color: "#3b82f6", fontSize: "12px" }} />
            </Link>
            {/* <div className="items-center overflow-hidden lg:max-w-[780px] max-w-[300px]"> */}
              {post?.feeling && <h6 className="inline-flex m-0 ml-1">{post.feeling}</h6>}
              {post?.listTagUser.length > 0 && <h6 className="inline-flex m-0 mx-1">cùng với</h6>}
              {post?.listTagUser.length > 0 && post?.listTagUser.map((user, index) => (
                <Link
                  to={`/profile/${user._id}`}
                  key={index}
                  className="mr-1 text-blue-500 inline-flex"
                >
                   {user.username}{index + 1 !== post?.listTagUser.length && ","}
                </Link>
              ))}
              {post?.location?.address && <h6 className="inline-flex m-0 mr-1">ở</h6>}
              {post?.location?.address && <h6 className="inline-flex text-blue-500 m-0 mr-1">{post?.location?.address}</h6>}
            </div>
          {/* </div> */}
          <small>{moment(post.createdAt).fromNow()}</small>
        </div>
        {/* Add status icon and text */}
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons "
          id="moreLink"
          data-toggle="dropdown"
          style={{ color: "white" }}
        ></span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit Post
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove Post
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
