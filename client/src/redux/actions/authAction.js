import { toast } from "react-toastify";
import { ROLE_ID } from "../../const/role";
import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { authService } from "@/services/authServices";
import { decodeToken } from "@/utils/decodeToken";
import { toastError } from "@/utils/toast";

export const login = (data) => async (dispatch) => {

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    const { accessToken, user } = res.data.data;
    let userInfo = decodeToken(accessToken);

    authService.isAccessSystem(userInfo.userId).then(async (data) => {
      if (data === false) {
        toastError("Tài khoản của bạn đã bị chặn bởi nhà phát triển")
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            token: null,
            user: null,
          },
        });
      } else {
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            token: accessToken,
            user: user,
          },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  } catch (err) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast("Tên tài khoản hoặc mật khẩu không chính xác", { autoClose: 1000 });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    
  }
};

export const register = (data) => async (dispatch) => {
  //Write validate company here

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (data.roleId === ROLE_ID.COMPANY) {
      await postDataAPI("company/register", data);
      toast("Đăng kí tài khoản công ty thành công", {
        autoClose: 1000,
      });
    } else {
      await postDataAPI("client/register", data);
      toast("Đăng kí tài khoản thành viên thành công", {
        autoClose: 1000,
      });
    }

    const userData = { email: data.email, password: data.password };
    return dispatch(login(userData));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    if (err.response.data.message) {
      toast(err.response.data.message, {
        autoClose: 1000,
      });
    } else {
      toast("Lỗi server, vui lòng quay lại sau", {
        autoClose: 1000,
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("accessToken");
    await postDataAPI("logout");
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: null,
        user: null,
      },
    });
   
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
