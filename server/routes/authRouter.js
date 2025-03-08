const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const catchAsync = require("../middleware/catchAsync");

router.post("/client/register", catchAsync(authController.registerClient));

router.post("/company/register", catchAsync(authController.registerCompany));

router.post("/login", catchAsync(authController.login));

router.post("/logout", catchAsync(authController.logout));

router.post("/clearData", catchAsync(authController.clearUser));

router.get(
  "/isAccessSystem/:userId",
  catchAsync(authController.isAccessSystem)
);
router.post("/blockUser", auth, catchAsync(authController.blockUser));
router.post("/unBlockUser", auth, catchAsync(authController.unBlockUser));

module.exports = router;
