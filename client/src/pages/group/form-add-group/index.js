import Search from "@/components/Search";
import { groupService } from "@/services/groupServices";
import { useStoreMobx } from "@/stores";
import { imageUpload } from "@/utils/imageUpload";
import { toast } from "@/utils/toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
const FormAddGroup = ({ onClose }) => {
  const initState = {
    groupName: "",
    detail: "",
    privacy: "public",
    avatarUrl: undefined,
  };
  const [groupData, setGroupData] = useState(initState);
  const { notificationStore } = useStoreMobx();
  const [isShowAddMember, setIsShowAddMember] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { groupName, detail, privacy, avatarUrl } = groupData;
  const themeMui = useTheme();
	const fullScreen = useMediaQuery(themeMui.breakpoints.down('md'));

  const { theme } = useSelector((state) => state);

  const [listMember, setListMember] = useState([]);

  const handleSubmit = async () => {
    if (!groupName) return toast("Tạo thất bại");
    if (!detail) return toast("Tạo thất bại");
    if (listMember.length == 0) return toast("Tạo thất bại");
    groupService
      .createGroup({
        name: groupName,
        avatar: avatarUrl
          ? avatarUrl
          : "https://res.cloudinary.com/hoquanglinh/image/upload/v1668926456/zbalcpggyn1r8ljjzcti.jpg",
        desc: detail,
        sendingRequests: listMember.map((member) => member.id),
        privacy: privacy,
      })
      .then((res) => {
        notificationStore.pushNotification({
          text: `đã mời bạn tham gia nhóm ${groupName}`,
          recipients: listMember.map((member) => member.id),
          url: `/group/${res.group._id}`,
        });
        toast("Tạo nhóm thành công.");
        onClose();
      });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const media = await imageUpload([file]);
    setGroupData({ ...groupData, avatarUrl: media[0].url });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleRemove = (user, index) => {
    // remove
    const temp = [...listMember];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setListMember(temp);
  };

  const handleAddUser = (user, index) => {

    //check is user in list
    if (
      listMember.some((item) => JSON.stringify(item) === JSON.stringify(user))
    ) {
      console.log("user is in array");
    } else {
      // add user to ListMember
      setListMember([...listMember, user]);
    }
  };

  return (
    <Dialog fullScreen={fullScreen} open={true} onClose={onClose} >
      <DialogContent style={{ width: `${fullScreen ? "100%" : "600px"}`, padding: "0px 24px 18px 24px" }} >
        <div className="add_group_modal">
          <div className="add_group">
            <form
              className="add_group_form"
              onSubmit={(e) => {
                if (e.key === "Enter") console.log("no");
                else e.preventDefault();
              }}
            >

              <div className="info_avatar">
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : "https://res.cloudinary.com/hoquanglinh/image/upload/v1668926456/zbalcpggyn1r8ljjzcti.jpg"
                  }
                  alt="avatar"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span>
                  <i className="fas fa-camera" />
                  <p>Change</p>
                  <input
                    onChange={handleUploadImage}
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                  />
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="fullname">Tên nhóm</label>
                <div className="position-relative">
                  <input
                    name="groupName"
                    value={groupName}
                    onChange={onChangeInput}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="story">Chi tiết</label>
                <textarea
                  value={detail}
                  name="detail"
                  onChange={onChangeInput}
                  cols="30"
                  rows="3"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="members">Thành viên</label>
                <div className="h-fit  max-h-[110px] overflow-y-auto flex flex-wrap border rounded-md mt-1 bg-white items-center">
                  {listMember.map((user, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 w-fit rounded-sm m-2 items-center flex"
                    >
                      <p className="text-blue-900 ml-2">{user.username}</p>
                      <IconButton
                        className="focus:outline-none"
                        sx={{ p: 1 }}
                        onClick={() => handleRemove(user, index)}
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
                </div>
                {isShowAddMember ? (
                  <div>
                    <div className="flex items-center justify-between mt-3">
                      <Search
                        listMember={listMember}
                        handleAddUser={handleAddUser}
                      />
                      <IconButton
                        className="focus:outline-none"
                        sx={{ p: 1 }}
                        onClick={() => setIsShowAddMember(false)}
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </div>
                    <div className="mt-2 h-[200px]"></div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsShowAddMember(true)}
                    type="button"
                    className="btn btn-info w-100 text-[#17a2b8] mt-2"
                  >
                    Thêm thành viên
                  </button>
                )}
              </div>

              <label htmlFor="gender">Chính sách</label>
              <div className="input-group-prepend px-0 mb-4">
                <select
                  name="privacy"
                  id="privacy"
                  value={privacy}
                  onChange={onChangeInput}
                  className="custom-select "
                >
                  <option value="public">
                    Công khai (Bất kì ai cũng có thể thấy)
                  </option>
                  <option value="private">
                    Riêng tư (Chỉ bạn bè của bạn mới xem được)
                  </option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="btn btn-info w-100 text-[#17a2b8]"
                type="submit"
              >
                Lưu
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormAddGroup;
