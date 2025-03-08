import { useState } from "react";
import { overrideTailwindClasses } from "tailwind-override";
import icon3 from "../assets/gif/persevering.gif";
import icon1 from "../assets/gif/smiling.gif";
import icon2 from "../assets/gif/winking.gif";

const LikeButton = ({ isLike, handleLike, handleUnLike, isPost = false }) => {
  const [isShowFeelingList, setIsShowFeelingList] = useState(false);
  const handleShowFeeling = () => {
    setIsShowFeelingList(true);
  };
  const handleCloseFeeling = () => {
    setIsShowFeelingList(false);
    handleLike();
  };
  // Add by Dat on 22/5/2023
  // Change icon UI when click
  const [iconClass, setIconClass] = useState("fas fa-heart text-danger");

  const handleChangeIcon = (icon) => {
    setIsShowFeelingList(false);
    handleLike();
    if (icon == "smiling") {
      setIconClass("fas fa-heart text-danger");
    }

    if (icon == "winking") {
      setIconClass("fa fa-smile-wink text-warning");
    }

    if (icon == "persevering") {
      setIconClass("fa fa-sad-cry text-success");
    }
  };

  return (
    <>
      {isLike ? (
        <div>
          <i className={iconClass} onClick={handleUnLike} />
        </div>
      ) : (
        <div className="relative justify-center">
          {isShowFeelingList == true && (
            <div
              className={overrideTailwindClasses(
                `h-[40px] items-end max-w-[180px] w-[140px] absolute border rounded-xl ${
                  isPost ? "-left-[16px] -top-9" : "-left-[60px] -top-10"
                } bg-white z-10`
              )}
            >
              <img
                className="inline-flex"
                src={icon1}
                alt="feeling1"
                style={{ height: "40px", width: "40px", margin: "0px" }}
                onClick={() => handleChangeIcon("smiling")}
              />
              <img
                className="inline-flex"
                src={icon2}
                alt="feeling2"
                style={{ height: "40px", width: "40px" }}
                onClick={() => handleChangeIcon("winking")}
              />
              <img
                className="inline-flex"
                src={icon3}
                alt="feeling3"
                style={{ height: "40px", width: "40px" }}
                onClick={() => handleChangeIcon("persevering")}
              />
            </div>
          )}
          <i
            className="far fa-heart "
            onClick={() => setIsShowFeelingList(!isShowFeelingList)}
          />
        </div>
      )}
    </>
  );
};

export default LikeButton;
