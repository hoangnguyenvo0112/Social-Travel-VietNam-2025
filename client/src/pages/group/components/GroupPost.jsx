import EmptyImg from "@/assets/image/empty.jpg";
import Loading from "@/components/Loading";
import Posts from "@/components/home/Posts";
import Status from "@/components/home/Status";
import ListPostInGroup from "./ListPostInGroup";
import { useEffect, useState } from "react";
import { groupService } from "@/services/groupServices";
import { useDispatch, useSelector } from "react-redux";

const GroupPost = ({ isJoin, groupId }) => {

  const { homePosts } = useSelector((state) => state);

  const [groupPosts,setGroupPosts]=useState()
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    groupService.getPostByGroupId(groupId).then(data=>{
      setGroupPosts(data)
      setIsLoading(false)
    }).catch(err=>{
      console.log(err)
      setIsLoading(false)
    })
  },[homePosts])
  return (
    <>
      
      <div
        className={`${
          isJoin ? "opacity-100" : "opacity-50 pointer-events-none"
        }`}
      >
        <Status />
      </div>
   
      {isLoading ? (
        <Loading />
      ) : groupPosts.result === 0 &&groupPosts.posts.length === 0 ? (
        <div>
          <h2 className="text-center my-3 text-red-500">
            Hiện tại chưa có bài đăng
          </h2>
          <img src={EmptyImg} alt="" className="w-full h-auto mx-auto" />
        </div>
      ) : (
        <ListPostInGroup groupPosts={groupPosts} />
      )}
    </>
  );
};
export default GroupPost;
