const router = require("express").Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.post("/comment", auth, catchAsync(commentController.createComment));

router.patch("/comment/:id", auth, catchAsync(commentController.updateComment));

router.patch(
  "/comment/:id/like",
  auth,
  catchAsync(commentController.likeComment)
);

router.patch(
  "/comment/:id/unlike",
  auth,
  catchAsync(commentController.unLikeComment)
);

router.delete(
  "/comment/:id",
  auth,
  catchAsync(commentController.deleteComment)
);

module.exports = router;
