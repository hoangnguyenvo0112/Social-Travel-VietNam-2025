const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.get("/posts", auth, catchAsync(postController.getPosts));

router.post("/posts", auth, catchAsync(postController.createPost));
router
  .route("/post/:id")
  .patch(auth, catchAsync(postController.updatePost))
  .get(auth, catchAsync(postController.getPost))
  .delete(auth, catchAsync(postController.deletePost));

router.patch("/post/:id/like", auth, catchAsync(postController.likePost));

router.patch("/post/:id/unlike", auth, catchAsync(postController.unLikePost));

router.get("/user_posts/:id", auth, catchAsync(postController.getUserPosts));

router.get(
  "/postsByGroupId/:groupId",
  auth,
  catchAsync(postController.getPostByGroupId)
);

router.get("/post_discover", auth, catchAsync(postController.getPostsDiscover));

router.patch("/savePost/:id", auth, catchAsync(postController.savePost));

router.patch("/unSavePost/:id", auth, catchAsync(postController.unSavePost));

router.get("/getSavePosts", auth, catchAsync(postController.getSavePosts));

router.get("/story/myStory", auth, catchAsync(postController.myStory));
router.post("/story/addStory", auth, catchAsync(postController.addStory));
router.post("/story/delete", auth, catchAsync(postController.deleteStory));
router.post("/post_audience",auth,catchAsync(postController.updateAudience))
module.exports = router;
