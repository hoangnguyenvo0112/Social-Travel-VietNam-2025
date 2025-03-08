import { friendService } from "@/services/friendServices";
import { makeAutoObservable } from "mobx";
class FriendStore {
  constructor() {
    makeAutoObservable(this);
  }
  isLoading = true;
  isFriendsSuggestLoading = true;
  myFriends = [];
  friendsRequest = [];
  friendsSuggest = [];

  setFriendsRequest(friendsRequest) {
    this.friendsRequest = friendsRequest;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  getFriendsSuggest() {
    this.isFriendsSuggestLoading = true;
    friendService
      .getFriendsSuggest()
      .then((data) => {
        this.friendsSuggest = data;
        this.isFriendsSuggestLoading = false;
      })
      .catch(() => {
        this.friendsSuggest = [];
        this.isFriendsSuggestLoading = false;
      });
  }
  getFriendsRequest() {
    this.isLoading = true;
    friendService.getFriendsRequest().then((data) => {
      this.friendsRequest = data;
      this.isLoading = false;
    }).catch(err=>{
        this.isLoading=false
    });
  }

  getMyFriends() {
    this.isLoading = true;
    friendService
      .getMyFriends()
      .then((data) => {
        this.myFriends = data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
      });
  }
}

const friendStore = new FriendStore();
export default friendStore;
