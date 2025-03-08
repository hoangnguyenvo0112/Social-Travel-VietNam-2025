import { makeAutoObservable } from "mobx";
import io from "socket.io-client";
class SocketStore {
  socket;
  constructor() {
    console.log("make sure call one time");
    this.socket = io('https://travelbee-api-production.onrender.com');
    makeAutoObservable(this);
  }
}

const socketStore = new SocketStore();
export default socketStore;
