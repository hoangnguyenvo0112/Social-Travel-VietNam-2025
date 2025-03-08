import { useSelector } from "react-redux";
import FollowBtn from "../FollowBtn";
import UserCard from "../UserCard";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const Followers = ({ users, setShowFollowers, showFollowers }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={showFollowers}
    >
      <DialogTitle>Danh sách người theo dõi</DialogTitle>
      <DialogContent dividers>
        {users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowFollowers={setShowFollowers}
          >
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setShowFollowers(false)}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Followers;
