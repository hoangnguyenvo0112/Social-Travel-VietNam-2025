import { createContext, useContext } from "react";

import friendStore from "./friendStore";
import socketStore from "./socketStore";
import userStore from "./userStore";
import NotificationStore from "./notificationStore";
// const socket = io();
const notificationStore = new NotificationStore(socketStore.socket);
export const rootStore = {
  userStore,
  friendStore,
  socketStore,
  notificationStore,
};
export const StoreContext = createContext(rootStore);

export const useStoreMobx = () => useContext(StoreContext);
