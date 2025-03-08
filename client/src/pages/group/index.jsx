import React, { useState } from "react";
import FormAddGroup from "./form-add-group";
import FriendGroups from "./friend-group";
import MyGroups from "./my-group";
import Banner from "@/assets/image/banner.jpg";
import "./index.css";
const Group = () => {
  const [showFormAddGroup, setShowFormAddGroup] = useState(false);
  const handleShowFormAddGroup = () => {
    setShowFormAddGroup(true);
  };
  return (
    <React.Fragment>
      {showFormAddGroup && (
        <FormAddGroup onClose={() => setShowFormAddGroup(false)}></FormAddGroup>
      )}
      <button
        onClick={handleShowFormAddGroup}
        className="focus:outline-none flex justify-center items-center my-3 w-full p-1 border-2 border-[#17a2b8] text-[#17a2b8] hover:bg-[#17a2b8] hover:text-white "
      >
        <i className="fa fa-arrow-right animate-bounce"></i>
        <p className="ml-2 animate-pulse">Tạo nhóm</p>
      </button>
      <FriendGroups/>
      <div className="relative">
        <img
          src={Banner}
          alt="Quảng cáo"
          style={{ width: "100%", height: "auto" }}
          className="relative"
        />
      </div>
      {
        !showFormAddGroup &&<MyGroups/>
      }
      
    </React.Fragment>
  );
};

export default Group;
