const router = require("express").Router();
const auth = require("../middleware/auth");
const analystController = require("../controllers/analystController");
const catchAsync = require("../middleware/catchAsync");

router.get("/analyst/dashboard", catchAsync(analystController.getDashboard));

router.get(
  "/analyst/socialMedia",
  catchAsync(analystController.getSocialMedia)
);
router.get(
  "/analyst/populatePost",
  catchAsync(analystController.getPopularPost)
);
router.get(
  "/analyst/populateGroup",
  catchAsync(analystController.getPopularGroup)
);
router.get(
  "/analyst/populateUser",
  catchAsync(analystController.getPopularUser)
);
router.get(
  "/revenueByMonthForEachPackage",
  catchAsync(analystController.getRevenueByMonthForEachPackage)
);
router.get(
  "/getAnalystPackage",
  catchAsync(analystController.getAnalystPackage)
);
router.get(
  "/getSummaryInYear",
  catchAsync(analystController.getSummaryInYear)
);
router.get(
  "/getSummaryMoneyInYear",
  catchAsync(analystController.getSummaryMoneyInYear)
);
router.get(
  "/getTopMostComment",
  catchAsync(analystController.getTopMostComment)
);

module.exports = router;
