import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth.token);
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/");
  }, [localStorage.getItem("accessToken")]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} className="max-w-sm" autoComplete="none">
        <div className="header-group">
          <img
            src="https://raw.githubusercontent.com/LTBichTram/social-food/main/frontend/src/assets/images/logoS.png"
            alt=""
            className="logo-img"
          />
          <h3 className="text-uppercase text-center mb-4"></h3>
        </div>

        <div className="form-group" style={{ color: "rgb(244 241 255 / 88%)" }}>
          <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
          <input
            autoComplete="none"
            aria-autocomplete="none"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChangeInput}
            value={email}
          />
        </div>

        <div
          className="form-group "
          style={{ color: "rgb(244 241 255 / 88%)" }}
        >
          <label htmlFor="exampleInputPassword1">Mật khẩu</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn w-100 btn-login text-white"
          disabled={email && password ? false : true}
        >
          Đăng nhập
        </button>

        <p
          className="mt-3 "
          style={{ color: "rgb(226, 215, 255)", textAlign: "center" }}
        >
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" style={{ color: "#AED6F1" }}>
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
