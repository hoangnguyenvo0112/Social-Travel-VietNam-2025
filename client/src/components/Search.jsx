import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "./UserCard";
import LoadIcon from "../images/loading.gif";
import Avatar from "./Avatar";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Loading from "./Loading";

const Search = (props) => {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    console.log("DATAAA: ",users);
    setSearch("");
    setUsers([]);
  };

  const handleClick = (user,index) => {
    // remove
    const temp = [...users];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setUsers(temp);

    // add to list member
    props.handleAddUser(user,index);
  };

  return (
    <div className="relative w-full">
      <input
        className="bg-white border border-[#ddd] px-2 min-w-[200px] h-[40px] w-full outline-none indent-1 rounded-3xl"
        type="text"
        value={search}
        title="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value)
        }
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(e) }}
      />

      <div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 items-center w-full text-center ml-[10px] text-[12px] pointer-events-none"
        style={{ opacity: search ? 0 : 1, color: "#3633a8" }}
      >
        <SearchIcon/>
        <span className="text-[16px]">Tìm kiếm thành viên</span>
      </div>

      <div
        className="absolute top-[50%] -translate-y-1/2 right-[20px] hover:text-red-500"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        <CloseIcon/>
      </div>

      {load &&
      <div
        className="absolute top-[50%] -translate-y-1/2 right-[80px] hover:text-red-500"
        onClick={handleClose}
      >
        <Loading size={20}/>
      </div>}

      <div className="absolute border mt-1 border-[#ddd] rounded-md w-full bg-white max-h-[200px] overflow-auto hover:overflow-y-auto " style={{ opacity: search ? 1 : 0 }}>
        {search &&
          users.map((user, index) => (
            <div key={user._id} onClick={() => handleClick(user, index)} className="flex items-center p-2 hover:bg-slate-200 cursor-pointer">
              <Avatar src={user.avatar} size="big-avatar" />
              <div className="username ml-2 color-Black">
                <span className="d-block">{user.username}</span>
                <small>{user.fullname}</small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
