import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
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
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        autoComplete="off"
        id="search"
        title="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div
        className="search_icon items-center w-full text-center ml-[10px]"
        style={{ opacity: search ? 0 : 1, color: "#3633a8" }}
      >
        <SearchIcon/>
        <span className="text-[16px]">Tìm kiếm trên Travel Bee</span>
      </div>

      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users z-20" style={{ opacity: search ? 1 : 0 }}>
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
