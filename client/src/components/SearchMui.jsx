import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import Avatar from "./Avatar";
const SearchMui = (props) => {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    // You can change this for type of user you want to search
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
      setIsSearch(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsSearch(false);
    setSearch("");
    setUsers([]);
  };

  const handleClick = (user, index) => {
    // remove
    const temp = [...users];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setUsers(temp);

    // add to list member
    if (props?.handleAddUser) props.handleAddUser(user, index);

    // handle other props
    if (props?.setOpen) props.setOpen(false);
  };

  return (
    <Box
      display="flex"
      backgroundColor="#fff"
      sx={{ boxShadow: 1, width: "200px" }}
      borderRadius="4px"
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          "& .MuiInputBase-input": {
            borderWidth: 0,
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(e);
        }}
        placeholder={
          props?.handleAddUser ? "Tìm kiếm bạn bè..." : "Tìm kiếm..."
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {load == true ? (
        <IconButton
          type="button"
          className="focus:outline-none animate-spin"
          sx={{ p: 1 }}
        >
          <RotateRightIcon />
        </IconButton>
      ) : (
        <>
          {search ? (
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={handleClose}
            >
              <CloseOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={handleSearch}
            >
              <SearchOutlinedIcon />
            </IconButton>
          )}
        </>
      )}
      <div
        className="absolute z-10 border mt-[45px] border-[#ddd] rounded-md w-[200px] bg-white max-h-[200px] overflow-clip hover:overflow-y-auto "
        style={{ opacity: search ? 1 : 0 }}
      >
        {search &&
          users.map((user, index) => (
            <div
              key={user._id}
              onClick={() => handleClick(user, index)}
              className="flex items-center p-1 hover:bg-blue-100 hover:rounded-3xl"
            >
              <Avatar src={user.avatar} size="medium-avatar" />
              <div className="username ml-2 color-Black">
                <span className="d-block">{user.username}</span>
                <small>{user.fullname}</small>
              </div>
            </div>
          ))}
      </div>
    </Box>
  );
};

export default SearchMui;
