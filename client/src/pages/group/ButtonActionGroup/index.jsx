import { groupService } from "@/services/groupServices";
import { useState } from "react";
import { overrideTailwindClasses } from "tailwind-override";

const ButtonActionGroup = ({ groupId, className }) => {
  const [isJoin, setIsJoin] = useState(false);
  const handleJoinGroup = () => {
    groupService.joinGroup(groupId).then((res) => {
      setIsJoin(true);
    });
  };
  return (
    <button
      disabled={isJoin}
      onClick={handleJoinGroup}
      className={overrideTailwindClasses(
        `btn btn-primary disable ${className}`
      )}
    >
      {isJoin ? "Đã tham gia" : "Tham gia"}
    </button>
  );
};

export default ButtonActionGroup;
