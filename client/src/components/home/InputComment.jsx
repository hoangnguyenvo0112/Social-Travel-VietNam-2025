import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { overrideTailwindClasses } from "tailwind-override";
import { createComment } from "@/redux/actions/commentAction";
import Avatar from "../Avatar";
import Icons from "../Icons";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };

  // Add by Dat on 20/5/2023
  // Enter @ and show recommend list
  const [userTag, setUserTag] = useState();
  const [showRecommendations, setShowRecommendations] = useState(false);
  let recommendUser = [
    {
      avatar:
        "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
      username: "User1",
    },
    {
      avatar:
        "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
      username: "User2",
    },
    {
      avatar:
        "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
      username: "User3",
    },
    {
      avatar:
        "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
      username: "User4",
    },
  ];

  const handleInputChange = (event) => {
    const input = event.target.value;
    setContent(input);

    if (input.includes("@")) {
      setShowRecommendations(true);

      const usernames = input
        .split(" ")
        .filter((word) => word.startsWith("@"))
        .map((username) => username.substr(1));
      setUserTag(usernames[0]);
    } else {
      setShowRecommendations(false);
      setUserTag();
    }
  };

  const handleTagUser = (item) => {
    if (content.includes("@")) {
      let temp = content;
      let newContent = temp.replace(`@${userTag}`, item.username);
      setContent(newContent);
      setUserTag();
    }
    setShowRecommendations(false);
  };

  // trigger @User change
  useEffect(() => {
    // Change recommendUser when userTag change
  }, [userTag]);

  return (
    <form className="card-footer comment_input relative" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Thêm bình luận..."
        value={content}
        onChange={handleInputChange}
        style={{
          background: theme ? "rgba(0,0,0,.03)" : "",
        }}
      />
      {showRecommendations && (
        <div
          className={overrideTailwindClasses(
            `bg-white z-40 p-2 max-h-[100px] overflow-clip hover:overflow-auto rounded-md absolute border -bottom-[85px] left-[20px]`
          )}
        >
          {recommendUser.map((item, index) => (
            <div
              className="p-2 flex hover:bg-gray-100 min-w-[200px]"
              key={index}
              onClick={() => handleTagUser(item)}
            >
              <Avatar src={item.avatar} size="small-avatar" />
              <p className="ml-1 text-sm text-black">{item.username}</p>
            </div>
          ))}
        </div>
      )}

      <Icons setContent={setContent} content={content} theme={theme} />

      <button type="submit" className="postBtn">
        Gửi
      </button>
    </form>
  );
};

export default InputComment;
