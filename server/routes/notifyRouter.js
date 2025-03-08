const router = require("express").Router();
const auth = require("../middleware/auth");
const notifyController = require("../controllers/notifyController");
const catchAsync = require("../middleware/catchAsync");

router.post("/notify", auth, catchAsync(notifyController.createNotify));

router.delete("/notify/:id", auth, catchAsync(notifyController.removeNotify));

router.get("/notifies", auth, catchAsync(notifyController.getNotifies));

router.patch(
  "/isReadNotify/:id",
  auth,
  catchAsync(notifyController.isReadNotify)
);

router.delete(
  "/deleteAllNotify",
  auth,
  catchAsync(notifyController.deleteAllNotifies)
);

module.exports = router;
