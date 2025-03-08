import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import ProvinceData from "../assets/vietnam_dataset/Index.json";
import { ROLE_ID } from "../const/role";

const RegisterUser = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mt-0 text-uppercase text-center mb-1 text-white">
        TRAVEL BEE
      </h3>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="fullname">Tên người dùng</label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          name="fullname"
          onChange={handleChangeInput}
          value={fullname}
          style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.fullname ? alert.fullname : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="username">Tên tài khoản</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          onChange={handleChangeInput}
          value={username.toLowerCase().replace(/ /g, "")}
          style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.username ? alert.username : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          onChange={handleChangeInput}
          value={email}
          style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.email ? alert.email : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="exampleInputPassword1">Mật khẩu</label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChangeInput}
            value={password}
            name="password"
            style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>

        <small className="form-text text-danger">
          {alert.password ? alert.password : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="cf_password">Xác thực mật khẩu</label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            onChange={handleChangeInput}
            value={cf_password}
            name="cf_password"
            style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>

        <small className="form-text text-danger">
          {alert.cf_password ? alert.cf_password : ""}
        </small>
      </div>

      <div
        className="row justify-content-between mx-0 mb-1"
        style={{ color: "rgb(244 241 255 / 88%)" }}
      >
        <label htmlFor="male">
          Male:{" "}
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            defaultChecked
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="female">
          Female:{" "}
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="other">
          Other:{" "}
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={handleChangeInput}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-register text-white">
        Đăng ký
      </button>

      <p
        className="mt-2"
        style={{ color: "rgb(226, 215, 255)", textAlign: "center" }}
      >
        Bạn đã có tài khoản?{" "}
        <Link to="/" style={{ color: "#AED6F1" }}>
          Đăng nhập ngay
        </Link>
      </p>
    </form>
  );
};
const RegisterBusiness = () => {
  // Cần fix "Lỗi alert ở register user vần truyền vào register business"
  // Phương án truyền riêng 1 alert khác cho register business
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    cf_password: "",
    companyName: "",
    taxCode: "",
    province: "Hồ Chí Minh",
    district: "",
    ward: "",
    street: "",
    address: "",
    roleId: ROLE_ID.COMPANY,
    username: "",
  };
  const [userData, setUserData] = useState(initialState);
  const {
    email,
    password,
    cf_password,
    companyName,
    taxCode,
    province,
    district,
    ward,
    street,
    roleId,
    username,
  } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const [districtData, setDistrictData] = useState();
  const [districtIndex, setDistrictIndex] = useState(0);
  const [wardData, setWardData] = useState(null);

  useEffect(() => {
    try {
      fetch(
        `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/${ProvinceData[province].file_path}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return setDistrictData(data);
        });
    } catch (error) {
      console.error(`Download district error: ${error.message}`);
    }
  }, [province]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleDistrictChangeInput = (e) => {
    const { name, value } = e.target;
    const index = e.target.options.selectedIndex;
    setUserData({ ...userData, [name]: value });
    setDistrictIndex(index - 1);
    setWardData(districtData?.district[index - 1].ward);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData));
  };

  return (
    <form className="max-h-[610px] overflow-y-scroll" onSubmit={handleSubmit}>
      <h3 className="mt-0 text-uppercase text-center mb-1 text-white">
        BUSINESS
      </h3>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="companyName">Tên doanh nghiệp</label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          name="companyName"
          onChange={handleChangeInput}
          value={companyName}
          style={{ background: `${alert.companyName ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.companyName ? alert.companyName : ""}
        </small>
      </div>
      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="companyName">Tên tài khoản</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          onChange={handleChangeInput}
          value={username}
          style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.username ? alert.username : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          onChange={handleChangeInput}
          value={email}
          style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.email ? alert.email : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="exampleInputPassword1">Mật khẩu</label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChangeInput}
            value={password}
            name="password"
            style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>

        <small className="form-text text-danger">
          {alert.password ? alert.password : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="cf_password">Xác nhận mật khẩu</label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            onChange={handleChangeInput}
            value={cf_password}
            name="cf_password"
            style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>

        <small className="form-text text-danger">
          {alert.cf_password ? alert.cf_password : ""}
        </small>
      </div>

      <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
        <label htmlFor="taxCode">Mã số thuế</label>
        <input
          type="text"
          className="form-control"
          id="taxCode"
          name="taxCode"
          onChange={handleChangeInput}
          value={taxCode}
          style={{ background: `${alert.taxCode ? "#fd2d6a14" : ""}` }}
        />

        <small className="form-text text-danger">
          {alert.taxCode ? alert.taxCode : ""}
        </small>
      </div>

      <div class="flex">
        <div
          className="form-group  w-1/2 mr-1"
          style={{ color: "rgb(244 241 255 / 88%)" }}
        >
          <label htmlFor="province">Tỉnh/Thành phố</label>
          <div class="relative">
            <select
              style={{ background: `${alert.province ? "#fd2d6a14" : ""}` }}
              class="form-control"
              name="province"
              id="province"
              onChange={handleChangeInput}
              value={province}
            >
              {Object.keys(ProvinceData).map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <small className="form-text text-danger">
            {alert.province ? alert.province : ""}
          </small>
        </div>
        <div
          className="form-group  w-1/2 ml-1"
          style={{ color: "rgb(244 241 255 / 88%)" }}
        >
          <label htmlFor="district">Quận/Huyện</label>
          <div class="relative">
            <select
              style={{ background: `${alert.district ? "#fd2d6a14" : ""}` }}
              class="form-control"
              name="district"
              id="district"
              onChange={handleDistrictChangeInput}
              value={district}
            >
              <option disabled selected value>
                {" "}
                -- Chọn --{" "}
              </option>
              {districtData != null
                ? districtData.district.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.pre} {item.name}
                    </option>
                  ))
                : undefined}
            </select>
          </div>

          <small className="form-text text-danger">
            {alert.district ? alert.district : ""}
          </small>
        </div>
      </div>
      <div class="flex">
        <div
          className="form-group w-1/2 mr-1"
          style={{ color: "rgb(244 241 255 / 88%)" }}
        >
          <label htmlFor="ward">Thị trấn/Xã</label>
          <div class="relative">
            <select
              style={{ background: `${alert.ward ? "#fd2d6a14" : ""}` }}
              class="form-control"
              name="ward"
              id="ward"
              onChange={handleChangeInput}
              value={ward}
            >
              <option disabled selected value>
                {" "}
                -- Chọn --{" "}
              </option>
              {districtData && wardData != null
                ? wardData.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.pre} {item.name}
                    </option>
                  ))
                : undefined}
            </select>
          </div>

          <small className="form-text text-danger">
            {alert.ward ? alert.ward : ""}
          </small>
        </div>
        <div
          className="form-group w-1/2 ml-1 "
          style={{ color: "rgb(244 241 255 / 88%)" }}
        >
          <label htmlFor="street">Đường</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            onChange={handleChangeInput}
            value={street}
            style={{ background: `${alert.street ? "#fd2d6a14" : ""}` }}
          />

          <small className="form-text text-danger">
            {alert.street ? alert.street : ""}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-register text-white">
        Đăng ký doanh nghiệp
      </button>

      <p
        className="mt-2"
        style={{ color: "rgb(226, 215, 255)", textAlign: "center" }}
      >
        Bạn đã có tài khoản?{" "}
        <Link to="/" style={{ color: "#AED6F1" }}>
          Đăng nhập ngay
        </Link>
      </p>
    </form>
  );
};

const Register = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  let ClassName = {
    p_active:
      "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group",
    svg_active: "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500",
    p: "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group",
    svg: "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300",
  };

  return (
    <div className="auth_page">
      <div className="max-w-md w-full items-center">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-center">
            <li
              class="mr-2 cursor-pointer"
              onClick={() => setIsBusiness(false)}
            >
              <p class={isBusiness ? ClassName.p : ClassName.p_active}>
                <svg
                  aria-hidden="true"
                  class={isBusiness ? ClassName.svg : ClassName.svg_active}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Người dùng
              </p>
            </li>
            <li class="mr-2 cursor-pointer" onClick={() => setIsBusiness(true)}>
              <p
                class={!isBusiness ? ClassName.p : ClassName.p_active}
                aria-current="page"
              >
                <svg
                  aria-hidden="true"
                  class={!isBusiness ? ClassName.svg : ClassName.svg_active}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Doanh nghiệp
              </p>
            </li>
          </ul>
        </div>
        {isBusiness ? <RegisterBusiness /> : <RegisterUser />}
      </div>
    </div>
  );
};

export default Register;
