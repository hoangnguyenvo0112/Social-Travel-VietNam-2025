import http from "./httpServices";

class PaymentService {
  async createPaymentUrl(amount) {
    const res = await http.post("api/payment/createPaymentUrl",{amount});
    return res.data.data;
  }
  async verifyPayment(token) {
    const res = await http.post("api/payment/verifyPayment", { token });
    return res.data.data;
  }
}

export const paymentService = new PaymentService();
