const router = require("express").Router();
const friendController = require("../controllers/friendController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.get(
  "/friends/myFriends",
  auth,
  catchAsync(friendController.getMyFriend)
);
router.get(
  "/friends/friendsRequest",
  auth,
  catchAsync(friendController.friendRequest)
);
router.post(
  "/friends/addFriendRequest",
  auth,
  catchAsync(friendController.addFriendRequest)
);
router.post(
  "/friends/acceptRequest",
  auth,
  catchAsync(friendController.acceptRequest)
);
router.get(
  "/friends/friendsSuggest",
  auth,
  catchAsync(friendController.friendsSuggest)
);
module.exports = router;
