const router = require("express").Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const catchAsync = require("../middleware/catchAsync");

router.get("/search", catchAsync(userController.searchUser));
router.get("/user/:id", auth, catchAsync(userController.getUserById));
router.patch("/user", auth, catchAsync(userController.updateUser));

router.patch("/user_auth/changePassword", auth, catchAsync(userController.changePassword));

router.patch("/user/:id/follow", auth, catchAsync(userController.follow));
router.patch("/user/:id/unfollow", auth, catchAsync(userController.unfollow));
router.get("/userManager/:roleId",auth, catchAsync(userController.getUserManager));
router.get(
  "/bo/getUserInfoFromBO",
  auth,
  catchAsync(userController.getUserInfoFromBO)
);
router.get(
  "/packages/getListPackage",
  auth,
  catchAsync(userController.getListPackage)
),
  router.post(
    "/packages/addOrUpdatePackage",
    auth,
    catchAsync(userController.addOrUpdatePackage)
  );

router.post(
  "/packages/registerPackage",
  auth,
  catchAsync(userController.registerPackage)
);

router.get(
  "/packages/getPackageManager",
  auth,
  catchAsync(userController.getPackageManager)
);

router.get(
  "/packages/getPackageByCompany",
  auth,
  catchAsync(userController.getPackageByCompany)
);

router.post(
  "/packages/postPackageTravel",
  auth,
  catchAsync(userController.postPackageTravel)
);
router.post(
  "/packages/updatePackageTravel",
  auth,
  catchAsync(userController.updatePackageTravel)
);
router.get(
  "/packages/recommendPackage",
  auth,
  catchAsync(userController.recommendPackage)
);
router.get(
  "/packages/recommendPackage/:id",
  auth,
  catchAsync(userController.recommendPackageById)
);

router.post("/order", auth, catchAsync(userController.getOrderDetail));

router.post("/events/create", auth, catchAsync(userController.createEvent));
router.get("/events/myEvents", auth, catchAsync(userController.getMyEvents));
router.post("/events/deleteEvent", auth, catchAsync(userController.deleteEvent));
router.get('/places/autoComplete',catchAsync(userController.getPlaceAutoComplete))


module.exports = router;
