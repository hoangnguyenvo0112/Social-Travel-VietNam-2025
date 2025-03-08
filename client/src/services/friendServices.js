import http from "./httpServices";

class FriendService {
  async getMyFriends() {
    const res = await http.get("api/friends/myFriends");
    return res.data.data;
  }

  async addFriendRequest(body) {
    const res = await http.post("api/friends/addFriendRequest", body);
    return res.data.data;
  }
  async getFriendsRequest() {
    const res = await http.get("api/friends/friendsRequest");
    return res.data.data;
  }
  async getFriendsSuggest() {
    const res = await http.get("api/friends/friendsSuggest");
    return res.data.data;
  }
  async acceptRequest(body) {
    const res = await http.post("api/friends/acceptRequest", body);
    return res.data.data;
  }
}

export const friendService = new FriendService();
