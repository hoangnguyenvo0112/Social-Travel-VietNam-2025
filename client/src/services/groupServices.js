import http from "./httpServices";

class GroupService {
  async joinGroup(groupId) {
    const res = await http.post("api/groups/join", { groupId });
    return res.data.data;
  }
  async getMyGroups() {
    const res = await http.get("api/groups/me/myGroups");
    return res.data.data;
  }
  async getReceiveGroup() {
    const res = await http.get("api/groups/me/receive");
    return res.data.data;
  }
  async getGroupById(groupId) {
    const res = await http.get(`api/groups/${groupId}`);
    return res.data.data;
  }
  async createGroup(data) {
    // {
    //     name: groupName,
    //     membersIds:membersIds;
    //     avatar: avatarUrl
    //       ? avatarUrl
    //       : "https://res.cloudinary.com/hoquanglinh/image/upload/v1668926456/zbalcpggyn1r8ljjzcti.jpg",
    //     desc: detail,
    //     privacy: privacy,
    // }
    const res = await http.post("api/groups/create", data);
    return res.data.data;
  }

  async getPostByGroupId(groupId) {
    const res = await http.get(`api/postsByGroupId/${groupId}`);
    return res.data.data;
  }
  async updateGroup(data) {
    const res = await http.post("api/groups/update", data);
    return res.data.data;
  }
  async inviteToGroup(data) {
    const res = await http.post("api/groups/inviteToGroup", data);
    return res.data.data;
  }
}

export const groupService = new GroupService();
