import { groupService } from "@/services/groupServices";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.css";
import ButtonActionGroup from "../ButtonActionGroup";
import EmptyImg from "../../../assets/image/empty.jpg";
import { Link } from "react-router-dom";
const FriendGroups = () => {
  const [listFriendGroups, setListFriendGroups] = useState([]);
  useEffect(() => {
    groupService
      .getReceiveGroup()
      .then((data) => {
        setListFriendGroups(data);
      })
      .catch((err) => setListFriendGroups([]));
  }, []);
  return (
    <div className="bg-white p-2 md:p-4 shadow-sm rounded-xl border-[1px #ddd] my-3">
      <h2 className="friend-group-title">Lời mời tham gia</h2>
      {listFriendGroups.length === 0 ? (
        <div>
          <p className="flex justify-center">Hiện bạn chưa có lời mời nào</p>
          <div className="flex justify-center">
            <img src={EmptyImg} className="w-1/2 h-auto" />
          </div>
        </div>
      ) : (
        <div className="friend-group-list ">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            modules={[Navigation]}
          >
            {listFriendGroups &&
              listFriendGroups.map((group) => {
                return (
                  <SwiperSlide>
                    <div>
                      <div class="card friend-card w-full">
                        <Link to={`/group/${group._id}`}>
                          <img
                            class="card-img-top"
                            src={
                              group.avatar
                                ? group.avatar
                                : "https://res.cloudinary.com/hoquanglinh/image/upload/v1668926456/zbalcpggyn1r8ljjzcti.jpg"
                            }
                            alt=""
                          />
                          <div class="card-body">
                            <h5 class="card-title text-blue-500 line-clamp-1">
                              {group.name}
                            </h5>
                            <p class="card-text line-clamp-2">{group.desc}</p>
                          </div>
                        </Link>

                        <div class="card-footer">
                          <span class="badge ">10 follower </span>
                          <ButtonActionGroup groupId={group._id} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default FriendGroups;
