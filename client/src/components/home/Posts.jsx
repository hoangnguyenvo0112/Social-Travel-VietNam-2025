import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";
import { POST_TYPES } from "@/redux/actions/postAction";
import { getDataAPI } from "@/utils/fetchData";
import LoadMoreBtn from "../LoadMoreBtn";
import Loading from "../Loading";

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });

    setLoad(false);
  };

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <Loading />}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
