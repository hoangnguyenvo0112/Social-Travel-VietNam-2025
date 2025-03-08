import { friendService } from "@/services/friendServices";
import { useStoreMobx } from "@/stores";
import { toast } from "@/utils/toast";
import { useState } from "react";

import { overrideTailwindClasses } from "tailwind-override";

const AddFriendButton = (props) => {
  const { className, user } = props;
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isFriend,setIsFriend]=useState(false)
  const { notificationStore, userStore, friendStore } = useStoreMobx();

  const handleAddFriend = async () => {
    if (!user || !user._id || user.isFriend || user.isSendingRequest) {
      return;
    }
    try {
      if (user.isReceiveRequest) {
        await friendService.acceptRequest({
          userId: user.id,
        });
        friendStore.getFriendsRequest();
        friendStore.getMyFriends();
        friendStore.getFriendsSuggest();
        toast(`Bạn đã là bạn bè với ${user.username}`);
        setIsFriend(true)
      } else {
        await friendService.addFriendRequest({ userId: user._id });
        await notificationStore.pushNotification({
          text: `đã gửi lời mời kết bạn cho bạn`,
          recipients: [user._id],
          url: `/profile/${userStore.user._id}`,
        });
        setIsSendingRequest(true);
      }
    } catch (err) {
      console.log("Error in AddFriendButton");
      console.log(err);
    }
  };
  return (
    <button
      onClick={handleAddFriend}
      className={overrideTailwindClasses(
        `whitespace-nowrap rounded-sm p-2 ${className} hover:opacity-80`
      )}
      style={{
        backgroundColor: "var(--success-bg)",
        color: "#fff",
        outline: "none",
        pointerEvents:
          user.isFriend || user.isSendingRequest || isSendingRequest||isFriend
            ? "none"
            : "auto",
      }}
    >
      {user.isFriend||isFriend
        ? "Bạn bè"
        : user.isSendingRequest || isSendingRequest
        ? "Đã gửi lời mời"
        : user.isReceiveRequest
        ? "Chấp nhận"
        : "Kết bạn"}
    </button>
  );
};

export default AddFriendButton;
