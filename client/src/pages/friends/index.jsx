import AddFriendButton from "@/components/AddFriendButton";
import SearchMui from "@/components/SearchMui";
import { useStoreMobx } from "@/stores";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewListIcon from "@mui/icons-material/ViewList";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyImg from "../../assets/image/empty.jpg";
import Loading from "@/components/Loading";

const Friend = () => {
  // page option
  const [active, setActive] = useState("Trang chủ");
  const { friendStore } = useStoreMobx();

  return (
    <div className="w-full flex justify-between prevent-select ">
      <div className="hidden md:block md:w-1/4 sticky top-[60px] left-0 h-fit">
        <div className="flex justify-between m-3 items-center">
          <strong className="text-xl">Bạn bè</strong>
          <SettingsIcon />
        </div>
        <div className="m-3 my-4 flex justify-between items-center">
          <SearchMui />
          <div className="p-2 rounded-md bg-blue-500 text-white px-3 hover:opacity-80">
            Áp dụng
          </div>
        </div>

        <FriendMenuItem
          icon={<HomeIcon />}
          title="Trang chủ"
          setActive={setActive}
          active={active}
        />
        <FriendMenuItem
          icon={<PersonAddIcon />}
          title="Lời mời kết bạn"
          setActive={setActive}
          active={active}
        />
        <FriendMenuItem
          icon={<PersonSearchIcon />}
          title="Gợi ý"
          setActive={setActive}
          active={active}
        />
        <FriendMenuItem
          icon={<ViewListIcon />}
          title="Tất cả bạn bè"
          setActive={setActive}
          active={active}
        />
      </div>
      <div className="md:w-3/4 w-full h-fit min-h-[90vh] bg-white p-4">
        {(active === "Trang chủ" || active === "Lời mời kết bạn") && (
          <>
            <strong className="text-lg ml-2 flex">Lời mời kết bạn</strong>
            <ReadMoreList list={friendStore.friendsRequest} itemsPerPage={5} />
          </>
        )}
        {(active === "Trang chủ" || active === "Gợi ý") && (
          <>
            <strong className="text-lg ml-2 flex">
              Những người bạn có thể biết
            </strong>
            <ReadMoreList isSuggest list={friendStore.friendsSuggest} itemsPerPage={20} />
          </>
        )}
        {(active === "Trang chủ" || active === "Tất cả bạn bè") && (
          <>
            <strong className="text-lg ml-2 flex">Danh sách bạn bè</strong>
            <ReadMoreList
              isFriend
              list={friendStore.myFriends.map((friend) => friend.user)}
              itemsPerPage={20}
            />
          </>
        )}
      </div>
    </div>
  );
};

const FriendMenuItem = ({ icon, title, active, setActive }) => {
  return (
    <div
      className={`mx-2 px-1 py-2 flex justify-between items-center cursor-pointer ${active === title ? " bg-slate-200 rounded-lg" : "hover:text-blue-500"
        }`}
      onClick={() => setActive(title)}
    >
      <div className="flex items-center">
        <div
          className={`p-2 rounded-full ${active === title ? "bg-blue-600 text-white" : "bg-slate-200"
            }`}
        >
          {icon}
        </div>
        <p className={`ml-2 text-m ${active === title ? "text-blue-500" : ""}`}>
          {title}
        </p>
      </div>
      <span class="material-icons">navigate_next</span>
    </div>
  );
};

// ReadMoreList element
const ReadMoreList = ({ list, itemsPerPage, isFriend,isSuggest }) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? <Loading /> : <>
        {
          list.length === 0 && (
            <div>
              <p className="flex justify-center">Hiện bạn chưa có lời mời nào</p>
              <div className="flex justify-center">
                <img src={EmptyImg} className="w-[400px] h-auto" />
              </div>
            </div>
          )
        }
        {list.slice(0, visibleItems).map((item, index) => (
          <FriendCard isSuggest={isSuggest} isFriend={isFriend} key={index} friend={item} />
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
        {visibleItems > itemsPerPage && (
          <div className="flex justify-center text-md  text-red-500">
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
      </>}
    </>
  );
};

const FriendCard = ({ friend, isFriend,isSuggest }) => {
  // function
  const navigate = useNavigate();
  return (
    <div className="inline-flex cursor-pointer">
      <div className="border rounded-md shadow-sm w-fit m-2 p-2">
        <img
          onClick={() => navigate(`/profile/${friend?.id}`)}
          className="rounded-sm h-[180px] w-[180px]"
          src={friend.avatar}
          alt="friend_avatar"
        />
        <strong className="text-md">
          {friend?.username ? friend.username : ""}
        </strong>
        {/* <p className='text-blue-500 text-base'>{friend?.name ? friend.name : "Tour du lịch"}</p> */}
        <p className="text-gray-500 text-[12px] invisible">
          {friend?.address ? friend.address : "Địa chỉ"}
        </p>
        {isFriend|isSuggest? (
          <button
            onClick={() => navigate(`/profile/${friend?.id}`)}
            className="p-2 text-center bg-blue-500 hover:opacity-90 text-white rounded-md w-full my-1"
          >
            Xem thông tin
          </button>
        ) : (
          <AddFriendButton user={{ ...friend, isReceiveRequest: true }} className="w-full" />
        )}

        {/* <button className="p-2 text-center bg-slate-200 hover:opacity-90 border rounded-md w-full my-1">
          Xóa
        </button> */}
      </div>
    </div>
  );
};

export default observer(Friend);
