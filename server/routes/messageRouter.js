const router = require("express").Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.post("/message", auth, catchAsync(messageController.createMessage));

router.get(
  "/conversations",
  auth,
  catchAsync(messageController.getConversations)
);

router.get("/message/:id", auth, catchAsync(messageController.getMessages));

router.delete(
  "/message/:id",
  auth,
  catchAsync(messageController.deleteMessages)
);

router.delete(
  "/conversation/:id",
  auth,
  catchAsync(messageController.deleteConversation)
);

module.exports = router;
