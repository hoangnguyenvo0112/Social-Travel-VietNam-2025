import { SOCKET } from "@/const/socket";
import { notificationService } from "@/services/notificationServices";
import { makeAutoObservable } from "mobx";
class NotificationStore {
  socket;
  notifies = [];
  constructor(socket) {
    console.log("constructor notification");
    makeAutoObservable(this);
    this.socket = socket;
  }

  async getNotification() {
    const notifies = await notificationService.getNotify();
    this.notifies = notifies;
  }
  async pushNotification({ id, text, recipients, url, content }) {
    const message = {
      id: id,
      text: text,
      recipients: recipients,
      url: url,
      content: content,
    };
    const data = await notificationService.createNotify(message);
    this.socket.emit(SOCKET.createNotify, data);
  }
}

export default NotificationStore;
