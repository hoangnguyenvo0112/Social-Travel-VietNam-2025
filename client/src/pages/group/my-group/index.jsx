import { groupService } from "@/services/groupServices";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../friend-group/index.css";
// Import Swiper styles
const MyGroups = () => {
  const [listMyGroups, setListMyGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    groupService
      .getMyGroups()
      .then((data) => {
        setListMyGroups(data);
      })
      .catch((err) => setListMyGroups([]));
  }, []);

  return (
    <div className="bg-white p-2 shadow-sm rounded-xl border-[1px #ddd] my-3">
      <h2 className="friend-group-title">Nhóm của bạn</h2>
      <div className="friend-group-list ">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={() => {}}
          navigation
          modules={[Navigation]}
        >
          {listMyGroups &&
            listMyGroups.map((group) => {
              return (
                <SwiperSlide>
                  <div>
                    <Link to={`/group/${group._id}`}>
                      <div class="card friend-card w-full">
                        <img
                          class="h-[220px]"
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
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MyGroups;
