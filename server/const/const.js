const CONFIG_PAYMENT = {
  vnp_TmnCode: "ARA1NKUU",
  vnp_HashSecret: "BWCSPSOFUBGWHFCKUFMAIGGXSVRSZZKJ",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  vnp_ReturnUrl: "https://travelbee-api-production.onrender.com/api/payment/paymentReturn",
};
const SOCKET = {
  createNotify: "createNotify",
  addMessage: "addMessage",
  createNotifyToClient: "createNotifyToClient",
};
module.exports = { SOCKET, CONFIG_PAYMENT };
