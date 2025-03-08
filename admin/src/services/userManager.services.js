import { ROLE_ID } from "@/utils/constant";
import http from "./httpServices";
class UserManagerService {
  async getUserById(userId) {
    const res = await http.get(`api/user/${userId}`);
    return res.data.data;
  }
  async getUserInfoFromBO() {
    const res = await http.get(`api/bo/getUserInfoFromBO`);
    return res.data.data;
  }
  async getUser() {
    const res = await http.get(`api/userManager/${ROLE_ID.CLIENT}`);
    return res.data.data;
  }
  async getCompany() {
    const res = await http.get(`api/userManager/${ROLE_ID.COMPANY}`);
    return res.data.data;
  }
  async getListPackage() {
    const res = await http.get(`api/packages/getListPackage`);
    return res.data.data;
  }
  async registerPackage(packageId) {
    const res = await http.post("api/packages/registerPackage", { packageId });
    return res.data.data;
  }
  async addOrUpdatePackage(packages) {
    /**
     * [
     *  {
     *     title:"",
     *     numberOfPost:"",
     *     price:1000,
     *     description:"Hello world"
     *  }
     * ]
     */
    const res = await http.post("api/packages/addOrUpdatePackage", packages);
    return res.data.data;
  }

  async getOrderDetail(orderId) {
    const res = await http.post(`api/order`, { orderId });
    return res.data.data;
  }

  async createEvent(data) {
    //payload data include
    /**
     * {name: string, startDate:Date, endDate:Date}
     */
    const res = await http.post("api/events/create", data);
    return res.data.data;
  }
  async getMyEvents() {
    const res = await http.get("api/events/myEvents");
    return res.data.data;
  }
  async deleteEvent(data) {
    const res = await http.post("api/events/deleteEvent",data);
    return res.data.data;
  }

  async getPackageManager() {
    const res = await http.get("api/packages/getPackageManager");
    return res.data.data;
  }
}

export const userManagerService = new UserManagerService();
