import jwt_decode from "jwt-decode";
import { LOCAL_STORAGE_KEY, ROLE_ID } from "./constant";
export function isAccessBackOffice() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const decode = jwt_decode(accessToken);
    const currentDate = Date.now() / 1000;
    if (
      !!decode.userId &&
      decode.exp > currentDate &&
      decode.roleId &&
      [ROLE_ID.ADMIN, ROLE_ID.COMPANY, ROLE_ID.STAFF].includes(decode.roleId)
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
}
export function getUserInfoFromLocalStorage() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const decode = jwt_decode(accessToken);
    const currentDate = Date.now() / 1000;
    if (
      !!decode.userId &&
      decode.exp > currentDate &&
      decode.roleId &&
      [ROLE_ID.ADMIN, ROLE_ID.COMPANY, ROLE_ID.STAFF].includes(decode.roleId)
    ) {
      return {
        userId: decode.userId,
        roleId: decode.roleId,
      };
    }
  } catch (error) {
    return null;
  }
}
