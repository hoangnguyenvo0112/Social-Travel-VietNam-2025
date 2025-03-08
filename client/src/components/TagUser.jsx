import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import { memo, useState } from "react";
import Avatar from "./Avatar";

import { useStoreMobx } from "@/stores";
import SearchStore from "./SearchStore";

const TagUser = ({ onChange,listTagUser }) => {
  const { friendStore } = useStoreMobx();
  const friends = friendStore.myFriends.map((item) => item.user);
  const [taggedUsers, setTaggedUsers] = useState(listTagUser);
  const [filterUsers, setFilterUsers] = useState(friends.filter(item=>{
     return listTagUser.every(tagUser=>tagUser._id!==item._id)
  }));

  const handleRemove = (user, index) => {
    const taggedUsersFilter=taggedUsers.filter((user, id) => id !== index)
    setTaggedUsers(taggedUsersFilter);
    setFilterUsers([...filterUsers, user]);
    onChange &&onChange(taggedUsersFilter)
  };


  const handleAddUser = (user) => {
    const newTaggedUsers = [...taggedUsers, user];
    setTaggedUsers(newTaggedUsers);
    onChange &&onChange(newTaggedUsers)
    const newFilterUsers = friends.filter((friend) =>
      newTaggedUsers.every((item) => item._id !== friend._id)
    );
    setFilterUsers(newFilterUsers);
  };

  const handleSearch = (value) => {

    const newFilterUser = friends.filter((user) =>
      user?.username.toUpperCase().includes(value.toUpperCase())
      &&taggedUsers.every(item=>item._id!==user._id)
    );
    setFilterUsers(newFilterUser);
  };
  return (
    <div className="w-full h-[300px] transition-shadow overflow-y-auto ">
      <div className="flex items-center justify-between">
        <p>Gắn thẻ bạn bè</p>
        <SearchStore onChange={handleSearch} />
      </div>
      <div>
        <p className="ml-1 mt-1">Đã gắn thẻ</p>
        <div className="h-fit min-h-[55px] max-h-[110px] overflow-y-auto flex flex-wrap border rounded-md mt-1">
          {taggedUsers.map((user, index) => (
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
      </div>
      <p className="ml-1 mt-1">Bạn bè</p>
      <div className="mt-2 p-2 border min-h-[55px] rounded-sm ">
        {filterUsers.map((user, index) => (
          <button
            type="button"
            className="p-2 flex items-center w-full hover:bg-blue-200 focus:outline-none rounded-sm"
            key={index}
            onClick={() => handleAddUser(user)}
          >
            <Avatar src={user.avatar} size="small-avatar" />
            <p className="ml-2">{user.username}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(TagUser);
