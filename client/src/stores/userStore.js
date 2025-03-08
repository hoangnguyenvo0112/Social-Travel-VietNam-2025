import { makeAutoObservable } from "mobx";
class UserStore {
  roleId = -1;
  isLogged = false;
  isAuthenticated = false;

  userDetail = {
    gender: "male",
    mobile: "",
    address: "",
    story: "",
    website: "",
    fullname: "",
    companyName: "",
    _id:""
  };
  user = {
    avatar: "",
    username: "",
    email: "",
    _id: "",
  };

  constructor() {
    makeAutoObservable(this);
  }
  setUser(user) {
    this.user = user;
  }
  setUserDetail(userDetail) {
    this.userDetail = userDetail;
  }
  setRoleId(roleId) {
    this.roleId = roleId;
  }
  setIsAuthenticated = async (isAuthenticate) => {
    this.isAuthenticated = isAuthenticate;
  };
  setIsLogged(isLog) {
    this.isLogged = isLog;
  }
}

const userStore = new UserStore();
export default userStore;
