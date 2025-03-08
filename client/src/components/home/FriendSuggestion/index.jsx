import Loading from "@/components/Loading";
import { friendService } from "@/services/friendServices";
import { useStoreMobx } from "@/stores";
import friendStore from "@/stores/friendStore";
import { toast } from "@/utils/toast";
import { observer } from "mobx-react";
import Avatar from "../../Avatar";

const FriendSuggestion = (props) => {
 
  return (
    <div className="right-sidebar mt-3">
      <div className="flex justify-between items-center my-2 mt-5">
        <h5>Lời mời kết bạn</h5>
        {!friendStore.isLoading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              friendStore.getFriendsRequest();
            }}
          />
        )}
      </div>

      {friendStore.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          {friendStore.friendsRequest.map((user) => (
            <div className="flex items-center pb-2">
              <Avatar src={user.avatar} size="big-avatar" />
              <div className="pl-3">
                <span className="text-sm">{user.username}</span>
                <div className="text-sm">
                  <button
                    onClick={async () => {
                      await friendService.acceptRequest({
                        userId: user.id,
                      });
                      friendStore.getFriendsRequest();

                      toast(`Bạn đã là bạn bè với ${user.username}`);
                    }}
                    className="p-2 mr-1 border bg-green-500 rounded-sm hover:opacity-80 text-white"
                  >
                    Chấp nhận
                  </button>
                  <button className="p-2 border bg-red-500 rounded-sm hover:opacity-80 text-white">
                    Từ chối
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(FriendSuggestion);
