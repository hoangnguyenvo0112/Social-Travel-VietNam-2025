import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import VerifiedIcon from '@mui/icons-material/Verified';

import {
  likeComment,
  unLikeComment,
  updateComment,
} from "@/redux/actions/commentAction";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "../../LikeButton";
import InputComment from "../InputComment";
import CommentMenu from "./CommentMenu";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        to={`/profile/${comment.user._id}`}
        className="d-flex items-center "
        style={{ textDecoration: "none" }}
      >
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1 mf-2 ca">{comment.user.username}</h6>
        <VerifiedIcon sx={{color: "#3b82f6", fontSize: "12px"}}/>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  to={`/profile/${comment.tag._id}`}
                  className="mr-1"
                  style={{ textDecoration: "none" }}
                >
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Ẩn" : "Xem thêm"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
            <small className="mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>
            {/* Add more option of cmt */}
            <small className="font-weight-bold mr-3">
              {comment.likes.length} Thích
            </small>

            {onEdit ? (
              <>
                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                  Chỉnh sửa
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  Hủy
                </small>
              </>
            ) : (
              <small className="font-weight-bold mr-3" onClick={handleReply}>
                {onReply ? "Hủy" : "Trả lời"}
              </small>
            )}
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: "pointer" }}
        >
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
