import { useSelector } from "react-redux";
import FollowBtn from "../FollowBtn";
import UserCard from "../UserCard";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const MutualFriend = ({ users, setShowMutualFriend, showMutualFriend }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={showMutualFriend}
    >
      <DialogTitle>Danh sách bạn chung</DialogTitle>
      <DialogContent dividers>
        {users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            // setShowMutualFriend={setShowMutualFriend}
          >
            {/* {auth.user._id !== user._id && <FollowBtn user={user} />} */}
          </UserCard>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setShowMutualFriend(false)}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MutualFriend;
