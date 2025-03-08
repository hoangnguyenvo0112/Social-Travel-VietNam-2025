import http from "./httpServices";

class NotificationService {
  async createNotify(data) {
    const res = await http.post("api/notify", data);
    return res.data.data;
  }
  async getNotify() {
    const res = await http.get("api/notifies");
    return res.data.data;
  }
}

export const notificationService = new NotificationService();
