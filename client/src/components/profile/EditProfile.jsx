import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { updateProfileUser } from "@/redux/actions/profileAction";
import { useStoreMobx } from "@/stores";
import { checkImage } from "@/utils/imageUpload";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = ({ user, setOnEdit }) => {
  const { userStore } = useStoreMobx();

  const [userData, setUserData] = useState(userStore.userDetail);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      ...userStore.user,
      fullname,
      mobile,
      address,
      website,
      story,
      gender,
    });
  }, [auth.user, userStore.userDetail]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setOnEdit(false);
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit}>
        <div className="btn_close" onClick={() => setOnEdit(false)}>
          <IoMdClose />
        </div>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : userStore.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Thay đổi</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <div className="form-group w-1/2 mr-1">
            <label htmlFor="fullname">Họ tên</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={handleInput}
              />
              <small
                className="text-danger position-absolute"
                style={{
                  top: "50%",
                  right: "5px",
                  transform: "translateY(-50%)",
                }}
              >
                {fullname && fullname.length}/25
              </small>
            </div>
          </div>

          <div className="form-group w-1/3 mx-1">
            <label htmlFor="mobile">Số điện thoại</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              className="form-control"
              onChange={handleInput}
            />
          </div>
          <div className="w-1/6 ml-1">
            <label htmlFor="gender">Giới tính</label>
            <div className="input-group-prepend mb-4">
              <select
                name="gender"
                id="gender"
                value={gender}
                className="custom-select text-capitalize"
                onChange={handleInput}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="form-group w-1/2 mr-1">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={address}
              className="form-control"
              onChange={handleInput}
            />
          </div>

          <div className="form-group w-1/2 ml-1">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              value={website}
              className="form-control"
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="story">Tiểu sử</label>
          <textarea
            name="story"
            value={story}
            cols="30"
            rows="4"
            className="form-control"
            onChange={handleInput}
          />

          <small className="text-danger d-block text-right">
            {story && story.length}/200
          </small>
        </div>

        <button className="btn btn-info w-100 text-[#17a2b8]" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
