import UserCard from "@/components/UserCard";
import { useStoreMobx } from "@/stores";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useState } from "react";

const GroupMember = ({ isOwner, friends, otherUsers }) => {
  const { userStore } = useStoreMobx();

  return (
    <>
      {/* We should using other status component to post in only this group */}
      <div className="my-3  p-[10px] bg-white border rounded-lg">
        
        <p className="text-gray-600 text-[14px] mb-2">
          Bạn và những người mới tham gia nhóm này sẽ hiển thị tại đây
        </p>

        <hr />
        <UserCard user={userStore.user} />
        <hr />
        <div className="mt-2">
          <strong>Bạn bè trong nhóm</strong>
          <ReadMoreList list={friends} itemsPerPage={3} isOwner={isOwner} />
        </div>
        <div className="mt-2">
          <strong>Thành viên khác</strong>
          <ReadMoreList list={otherUsers} itemsPerPage={5} isOwner={isOwner} />
        </div>
      </div>
    </>
  );
};

export default GroupMember;

const ReadMoreList = ({ list, itemsPerPage, isOwner }) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const [openDel, setOpenDel] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);
  const handleOpenDelDialog = (index) => {
    setTempIndex(index);
    setOpenDel(true);
  };
  const handleYes = () => {
    handleDeleteUser(tempIndex);
    setOpenDel(false);
  };
  const handleDeleteUser = (index) => {
    // // add tepm
    // const temp = [...rules];
    // // removing the element using splice
    // temp.splice(index, 1);
    // // updating the list
    // setRules(temp);
  };

  return (
    <>
      {list.slice(0, visibleItems).map((item, index) => (
        <UserCard
          key={index}
          user={item}
          // button1={
          //   isOwner && (
          //     <Tooltip title="Xóa" arrow>
          //       <IconButton
          //         type="button"
          //         className="focus:outline-none"
          //         sx={{ p: 1, ml: 1 }}
          //         onClick={() => handleOpenDelDialog(index)}
          //       >
          //         <DeleteIcon sx={{ fontSize: "18px", color: "#ef4444" }} />
          //       </IconButton>
          //     </Tooltip>
          //   )
          // }
        />
      ))}
      {visibleItems < list.length && (
        <div className="flex justify-center text-md  text-blue-500 ">
          <span className="material-icons focus:outline-none">
            arrow_drop_down
          </span>
          <button
            className="hover:underline focus:outline-none"
            onClick={handleLoadMore}
          >
            Xem thêm
          </button>
        </div>
      )}

      { (visibleItems > list.length && visibleItems > itemsPerPage) && ( 
      
        <div className="flex justify-center text-md  text-red-500 ">
          <span className="material-icons focus:outline-none">
            arrow_drop_up
          </span>
          <button
            className="hover:underline focus:outline-none"
            onClick={() => setVisibleItems(itemsPerPage)}
          >
            Ẩn
          </button>
        </div>
        
      )}
      <Dialog open={openDel}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa thành viên này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleYes()}>Chắc chắn</Button>
          <Button onClick={() => setOpenDel(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
