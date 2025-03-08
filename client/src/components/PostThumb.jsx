import { Link } from "react-router-dom";
import EmptyImg from "../assets/image/empty.jpg";
const PostThumb = ({ posts, result }) => {
  if (result === 0)
    return (
      <div>
          <h2 className="text-center my-3 text-red-500">
            Hiện tại chưa có bài đăng
          </h2>
          <img src={EmptyImg} className="w-full h-auto mx-auto" />
        </div>
    );

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            {post.images[0].url?.match(/video/i) ? (
              <video
                controls
                src={post.images[0].url}
                alt={post.images[0].url}
              />
            ) : (
              <img src={post.images[0].url} alt={post.images[0].url} />
            )}

            <div className="post_thumb_menu">
              <i className="far fa-heart">{post.likes.length}</i>
              <i className="far fa-comment">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
