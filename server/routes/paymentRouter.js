const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const catchAsync = require("../middleware/catchAsync");
const auth = require("../middleware/auth");
router.post(
  "/payment/createPaymentUrl",
  catchAsync(paymentController.createPaymentUrl)
);
router.get(
  "/payment/paymentReturn",
  catchAsync(paymentController.paymentReturn)
);
router.post(
  "/payment/verifyPayment",
  auth,
  catchAsync(paymentController.verifyPayment)
);
module.exports = router;
