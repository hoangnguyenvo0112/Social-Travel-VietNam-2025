import { makeAutoObservable } from "mobx";

class UserStore {
  roleName = "";
  isLogged = false;
  isAuthenticated = false;
  totalRevenue = 0;
  user = {
    avatar: "",
    email: "",
    money: 0,
    username: "",
    role: { roleId: -1, roleName: "" },
    followers: "",
    following: "",
    saved: "",
  };
  userDetail = {
    companyName: "",
    taxCode: "",
  };

  constructor() {
    makeAutoObservable(this);
  }
  setTotalRevenue(totalRevenue) {
    this.totalRevenue = totalRevenue;
  }
  setRoleName(roleName) {
    this.roleName = roleName;
  }
  setIsAuthenticated = async (isAuthenticate) => {
    this.isAuthenticated = isAuthenticate;
  };
  setUserDetail(userDetail) {
    this.userDetail = userDetail;
  }
  setUser(user) {
    this.user = user;
  }
  setIsLogged(isLog) {
    this.isLogged = isLog;
  }
}

const userStore = new UserStore();
export default userStore;
