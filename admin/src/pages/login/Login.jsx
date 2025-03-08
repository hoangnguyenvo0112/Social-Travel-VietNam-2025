import { authService } from "@/services/auth.services";
import { localStorageHelper } from "@/services/localStorage";
import { useStore } from "@/stores";
import { LOCAL_STORAGE_KEY, ROLE_ID } from "@/utils/constant";
import { toast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import { getUserInfoFromLocalStorage } from "@/utils/decodeToken";
import { Redirect } from "react-router-dom";
const Login = () => {
  const { userStore } = useStore();
  const userInfo = getUserInfoFromLocalStorage()
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    authService
      .login(user)
      .then(async (data) => {
        if (data.roleId === ROLE_ID.CLIENT) {
          toast("Bạn không có quyền truy cập vào trang này");
        } else {
          // save user data
         await localStorageHelper.store(
            LOCAL_STORAGE_KEY.accessToken,
            data.accessToken
          );
          // login
          userStore.setIsAuthenticated(true);
         

          history.push("/");
        }
      })
      .catch((err) => {
       
        toast("Tên tài khoản hoặc mật khẩu không chính xác");
      });
  };
  if(userInfo){
     return <Redirect to='/'/>
  }
  return (
    <div className="login_form">
      <form style={{ color: "#000" }}>
        <h3>Đăng nhập</h3>
        <label style={{ marginTop: "20px" }}>Tài khoản</label>
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label>Mật khẩu</label>
        <div>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Ghi nhớ đăng nhập
            </label>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleLogin}
          className="btn btn-primary btn-block"
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
};
export default Login;
