import http from "./httpServices";

class AuthService {
  async login(user) {
    const res = await http.post("/api/login", user);
    return res.data.data;
  }
  async isAccessSystem() {
    const res = await http.get("/api/isAccessSystem");
    return res.data.data;
  }
  async blockUser(userId) {
    const res = await http.post("/api/blockUser", { userId });
    return res.data.data;
  }
  async unBlockUser(userId) {
    const res = await http.post("/api/unBlockUser", { userId });
    return res.data.data;
  }
  async updateUser(data) {
    const res = await http.patch("/api/user", data);
    return res.data.data;
  }
  async changePassword(data) {
    //data
    /**
     * password
     * newPassword
     */
    const res = await http.patch("/api/user_auth/changePassword", data);
    return res.data.data;
  }
}

export const authService = new AuthService();
