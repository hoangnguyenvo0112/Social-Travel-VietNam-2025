import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import userStore from "@/stores/userStore";
import { observer } from "mobx-react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="status my-3 flex bg-white z-100">
      <Avatar src={userStore.user.avatar} size="big-avatar" />
      <button
        className="statusBtn flex-fill "
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.username}, bạn đang nghĩ gì?
      </button>
    </div>
  );
};

export default observer(Status);
