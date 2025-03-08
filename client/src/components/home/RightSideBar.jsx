import { useSelector } from "react-redux";

import FriendSuggestion from "./FriendSuggestion";
import PeopleSuggestion from "./PeopleSuggestion";

const RightSideBar = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div>
      <FriendSuggestion auth={auth} />
      <PeopleSuggestion auth={auth} />
    </div>
  );
};

export default RightSideBar;
