import http from "./httpServices";

class AnalystService {
  async getDashboard() {
    const res = await http.get("api/analyst/dashboard");
    return res.data.data;
  }
  
  async getSocialMedia() {
    const res = await http.get("api/analyst/socialMedia");
    return res.data.data;
  }

  async revenueByMonthForEachPackage() {
    const res = await http
      .get("api/revenueByMonthForEachPackage")
      .catch((err) => console.log(err));
    return res.data.data;
  }

  async getPopulatePost() {
    const res = await http.get("api/analyst/populatePost");
    return res.data.data;
  }

  async getPopulateGroup() {
    const res = await http.get("api/analyst/populateGroup");
    return res.data.data;
  }

  async getPopulateUser() {
    const res = await http.get("api/analyst/populateUser");
    return res.data.data;
  }

  async getAnalystPackage() {
    const res = await http.get("api/getAnalystPackage");
    return res.data.data;
  }

  async getSummaryInYear() {
    const res = await http.get("api/getSummaryInYear");
    return res.data.data;
  }

  async getSummaryMoneyInYear() {
    const res = await http.get("api/getSummaryMoneyInYear");
    return res.data.data;
  }

  async getTopMostComment() {
    const res = await http.get("api/getTopMostComment");
    return res.data.data;
  }
  
}
export const analystService = new AnalystService();
