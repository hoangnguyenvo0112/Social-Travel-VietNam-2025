import http from "./httpServices";

class GroupService {
  async getAllGroup() {
    const res = await http.get("api/groups");
    return res.data.data;
  }
}

export const groupService = new GroupService();
