import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              className="hover:animate-pulse"
              style={{ cursor: "pointer", color: "#dc143c" }}
              onClick={() => setNext(next + 10)}
            >
              Xem thêm...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div className="hover:animate-pulse" style={{ cursor: "pointer", color: "#3b82f6" }} onClick={() => setNext(1)}>
                Ẩn...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
