import Avatar from "@/components/Avatar";
import { groupService } from "@/services/groupServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonActionGroup from "./ButtonActionGroup";
import GroupIntroduce from "./components/GroupIntroduce";
import GroupMember from "./components/GroupMember";
import GroupPost from "./components/GroupPost";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "@/components/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { notificationService } from "@/services/notificationServices";
import { useStoreMobx } from "@/stores";
import { toast } from "@/utils/toast";

let scroll = 0;

const DetailGroup = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { notificationStore } = useStoreMobx();

  const [group, setGroup] = useState({
    infoGroup: {
      _id: "",
      name: "",
      avatar: "",
      desc: "",
      privacy: "",
      creator: "",
    },
    isMember: false,
    isReceiveRequest: false,
    isSendingRequest: false,
  });
  const [active, setActive] = useState("Bài đăng");

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    groupService
      .getGroupById(id)
      .then((data) => {
        setGroup(data);
        if (data.isMember || data.isOwner) {
          setIsJoin(true);
        } else {
          setIsJoin(false);
        }
      })
      .catch((err) => {
        navigate("/group");
      });
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, [id]);

  // Invite user popup
  const [openInvitePopup, setOpenInvitePopup] = useState(false);
  const [listMember, setListMember] = useState([]);
  const themeMui = useTheme();
  const fullScreen = useMediaQuery(themeMui.breakpoints.down("md"));

  const handleInvite = () => {
    const users = listMember.map((member) => member.id);
    const data = {
      groupId: group.infoGroup._id,
      users: users,
    };
    groupService.inviteToGroup(data).then((data) => {
      notificationStore.pushNotification({
        text: `đã mời bạn tham gia nhóm ${group.infoGroup.name}`,
        recipients: users,
        url: `/group/${group.infoGroup._id}`,
      });
    });
    toast("Bạn đã mời thêm thành viên vào nhóm")
    setOpenInvitePopup(false);
  };

  const handleOpenInvite = () => {
    setOpenInvitePopup(true);
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
    <div className="home ">
      {/* Header of group like desc name img v.v... */}
      <div className="sticky top-[60px] z-[2] my-3  p-[10px] bg-white border">
        <div className="flex items-center">
          <div className="p-1 min-w-fit bg-yellow-500 rounded-full">
            <Avatar src={group.infoGroup.avatar} size={"big-avatar"} />
          </div>
          <div className="justify-between ml-3">
            <div className="max-w-[550px]">
              <strong className="text-gray-600 text-[24px] inline-flex truncate">
                {group.infoGroup.name}
              </strong>
              {!isJoin ? (
                <ButtonActionGroup
                  className="ml-4"
                  groupId={group.infoGroup._id}
                />
              ) : (
                <button
                  onClick={() => handleOpenInvite()}
                  className="px-2 py-1 rounded-3xl inline-flex max-w-[100px] bg-blue-500 hover:bg-blue-400 focus:outline-none text-white ml-6"
                >
                  + Mời
                </button>
              )}
            </div>
            <p className="text-gray-400">{group.infoGroup.subTitle}</p>
          </div>
        </div>
        {/* Tag */}
        <div className="flex">
          <Tag title="Giới thiệu" active={active} setActive={setActive} />
          <Tag title="Bài đăng" active={active} setActive={setActive} />
          <Tag title="Thành viên" active={active} setActive={setActive} />
        </div>
      </div>

      {/* INVITE POPUP */}
      <Dialog
        fullScreen={fullScreen}
        open={openInvitePopup}
        onClose={() => setOpenInvitePopup(false)}
      >
        <DialogContent
          style={{
            width: `${fullScreen ? "100%" : "600px"}`,
            padding: "0px 24px 18px 24px",
          }}
        >
          <div className="flex items-center justify-between mt-3">
            <Search listMember={listMember} handleAddUser={handleAddUser} />
          </div>
          <div className="mt-2 h-[200px]"></div>
          <div className="h-fit max-h-[110px] min-h-[55px] overflow-y-auto flex flex-wrap border rounded-md mt-1 bg-white items-center">
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
          <button
            onClick={() => handleInvite()}
            className="mt-3 w-full py-2 text-white bg-blue-500 border rounded-sm hover:opacity-80 focus:outline-none "
          >
            Mời
          </button>
        </DialogContent>
      </Dialog>
      {active === "Giới thiệu" && (
        <GroupIntroduce groupId={id} />
      )}
      {active === "Bài đăng" && group && (
        <GroupPost groupId={id} isJoin={isJoin} />
      )}
      {active === "Thành viên" && (
        <GroupMember
          friends={group.friends}
          otherUsers={group.otherUsers}
          isOwner={group.isOwner}
        />
      )}
    </div>
  );
};

export default DetailGroup;

const Tag = ({ title = "Bài đăng", active, setActive }) => {
  let ClassName = {
    active:
      "inline-flex p-2 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group",
    unActive:
      "inline-flex p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 group",
  };
  return (
    <>
      {active === title ? (
        <div className={`${ClassName.active}`}>{title}</div>
      ) : (
        <div
          onClick={() => setActive(title)}
          className={`${ClassName.unActive}`}
        >
          {title}
        </div>
      )}
    </>
  );
};
