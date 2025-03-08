const { CONFIG_PAYMENT } = require("../const/const");
const moment = require("moment");
const sortObject = require("../middleware/payment");
let crypto = require("crypto");
let querystring = require("qs");
const { createAccessToken } = require("../common/jwt");
const paymentModel = require("../models/paymentModel");
const commentModel = require("../models/commentModel");
const companyModel = require("../models/companyModel");
const userModel = require("../models/userModel");
const { formatMoneyVND } = require("../common/string");
const paymentController = {
  createPaymentUrl: async (req, res) => {
    const amount = req.body.amount || 10000;
    const bankCode = "VNBANK";
    const locale = req.body.language || "vn";
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let tmnCode = CONFIG_PAYMENT.vnp_TmnCode;
    let secretKey = CONFIG_PAYMENT.vnp_HashSecret;
    let vnpUrl = CONFIG_PAYMENT.vnp_Url;
    let returnUrl = CONFIG_PAYMENT.vnp_ReturnUrl;
    let orderId = moment(date).format("DDHHmmss");

    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    // res.success(vnpUrl)
    return res.success(vnpUrl);
  },
  paymentReturn: async (req, res) => {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = sortObject(vnp_Params);

    let secretKey = CONFIG_PAYMENT.vnp_HashSecret;
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    if (secureHash === signed && vnp_Params["vnp_ResponseCode"] === "00") {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      const token = createAccessToken({
        money: vnp_Params["vnp_Amount"] / 100,
      });
      new paymentModel({
        token: token,
        money: vnp_Params["vnp_Amount"] / 100,
      }).save();
      return res.redirect(
        `https://admin-travelbee.onrender.com/profile/payment?token=${token}`
      );
    } else {
      return res.redirect(`https://admin-travelbee.onrender.com/profile/payment?status=error`);
    }

  },
  verifyPayment: async (req, res) => {
    const token = req.body.token;
    const me = req.user._id;
    if (!token) {
      return res.error("token is require");
    }
    const order = await paymentModel.findOne({
      token: token,
    });
    if (!order) {
      return res.success({
        message: `Token đã không hợp lệ`,
      });
    }
    if (order.isVerify) {
      return res.success({
        message: `Token đã được sử dụng`,
        userId: me,
        money: order.money,
      });
    }
    order.isVerify = true;
    order.user = me;
    order.save();
    const user = await userModel.findById(req.user._id);
    user.money =user.money+ order.money;
    user.save();
    return res.success({
      message: `Bạn đã nộp thành công số tiền ${formatMoneyVND(order.money)} vào tài khoản. Cảm ơn quý khách`,
      userId: me,
      money: order.money,
    });
  },
};
module.exports = paymentController;
