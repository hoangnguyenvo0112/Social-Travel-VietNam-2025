import AddFriendButton from "@/components/AddFriendButton";
import Loading from "@/components/Loading";
import friendStore from "@/stores/friendStore";
import { observer } from "mobx-react";
import UserCard from "../../UserCard";

const PeopleSuggestion = (props) => {
  return (
    <div className="right-sidebar mt-3">
      <div className="flex justify-between items-center my-2 mt-5">
        <h5>Những người bạn có thể biết</h5>
        {!friendStore.isFriendsSuggestLoading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => friendStore.getFriendsSuggest()}
          />
        )}
      </div>

      {friendStore.isFriendsSuggestLoading ? (
        <Loading />
      ) : (
        <div className="">
          {friendStore.friendsSuggest.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              button1={<AddFriendButton user={user} />}
              button2={
                <button
                  style={{
                    backgroundColor: "var(--danger-bg)",
                    color: "#fff",
                    outline: "none",
                  }}
                  className="whitespace-nowrap rounded-sm p-2 hover:opacity-80"
                >
                  Xóa
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(PeopleSuggestion);
