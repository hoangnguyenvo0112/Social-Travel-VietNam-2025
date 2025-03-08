import jwt_decode from "jwt-decode";
export function decodeToken(token) {
  try {
    const decode = jwt_decode(token);
    const currentDate = Date.now() / 1000;
    if (!!decode.userId && decode.exp > currentDate) {
      return {
        userId: decode.userId,
        roleId: decode.roleId,
      };
    }
  } catch (error) {
    return undefined;
  }
}
