import Loading from "@/components/Loading";
import News from "@/components/home/News";
import Posts from "@/components/home/Posts";
import Status from "@/components/home/Status";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyImg from "../../assets/image/empty.jpg";
let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="home ">
      <News />
      <Status />
      {homePosts.loading ? (
        <Loading />
      ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
        <div>
          <h2 className="text-center my-3 text-red-500">
            Hiện tại chưa có bài đăng
          </h2>
          <img src={EmptyImg} className="w-full h-auto mx-auto" />
        </div>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;
