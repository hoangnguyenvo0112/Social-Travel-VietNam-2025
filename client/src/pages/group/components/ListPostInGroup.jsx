import PostCard from "@/components/PostCard";
const ListPostInGroup = ({ groupPosts }) => {
  return (
    <div className="posts">
      {groupPosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ListPostInGroup;
