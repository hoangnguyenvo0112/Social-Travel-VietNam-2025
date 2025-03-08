const router = require("express").Router();
const groupController = require("../controllers/groupController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.get("/groups",auth, catchAsync(groupController.getAll));
router.get("/groups/:id", auth, catchAsync(groupController.getDetailGroup));
router.get(
  "/groups/me/receive",
  auth,
  catchAsync(groupController.getReceiveGroup)
);
router.get("/groups/me/myGroups", auth, catchAsync(groupController.getMyGroup));
router.post("/groups/create", auth, catchAsync(groupController.createGroup));
router.post("/groups/join", auth, catchAsync(groupController.joinGroup));
router.post('/groups/update',auth,catchAsync(groupController.updateGroup))
router.post('/groups/inviteToGroup',auth,catchAsync(groupController.inviteToGroup))


module.exports = router;
