import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "./UserCard";
import LoadIcon from "../images/loading.gif";
import Avatar from "./Avatar";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchMember = (props) => {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    // chỉ search thành viên trong group
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

  return (
    <div className="relative w-full">
      <input
        className="bg-white border border-[#ddd] px-2 min-w-[200px] h-[40px] w-full outline-none indent-1 rounded-3xl"
        type="text"
        value={search}
        title="Enter to SearchMember"
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

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="absolute border mt-1 border-[#ddd] rounded-md w-full bg-white max-h-[200px] overflow-auto hover:overflow-y-auto " style={{ opacity: search ? 1 : 0 }}>
        {search &&
          users.map((user, index) => (
            <UserCard user={user} key={index}/>
          ))}
      </div>
    </div>
  );
};

export default SearchMember;
