import userStore from "./userStore";
// import counterStore from "./couterStore";
import { createContext, useContext } from "react";

export const rootStore = {
  userStore,
};
export const StoreContext = createContext(rootStore);

export const useStore = () => useContext(StoreContext);
