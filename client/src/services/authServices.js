import http from "./httpServices";

class AuthService {
  async isAccessSystem(userId) {
    const res = await http.get(`/api/isAccessSystem/${userId}`);
    return res.data.data;
  }
}

export const authService = new AuthService();
