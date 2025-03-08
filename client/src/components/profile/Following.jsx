import { useSelector } from "react-redux";
import FollowBtn from "../FollowBtn";
import UserCard from "../UserCard";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const Following = ({ users, setShowFollowing, showFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={showFollowing}
    >
      <DialogTitle>Danh sách đang theo dõi</DialogTitle>
      <DialogContent dividers>
        {users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowFollowing={setShowFollowing}
          >
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setShowFollowing(false)}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Following;
